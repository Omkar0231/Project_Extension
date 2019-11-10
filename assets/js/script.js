$(document).ready(function () {
    $('#toLogin').prop("disabled", true);
    showGetStartSlides()
    $('.startButton').on('click', function () {
        $('#getstarted').html("")
        $('#getstarted').css('display', 'none');
        $('#toLogin').prop("disabled", false);
        renderProducts()

    });
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    var selector = $(".tabs").find(".selector");
    let cardsContent = "";
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px"
    });
    $(".tabs").on("click", "a", function (e) {
        e.preventDefault();
        $('.tabs a').removeClass("active");
        $(this).addClass('active');
        var href = $(this).attr('href');
        var activeWidth = $(this).innerWidth();
        var itemPos = $(this).position();
        $(".selector").css({
            "left": itemPos.left + "px",
            "width": activeWidth + "px"
        });
        if (href.match("#myKid")) {
            cardsContent = $("#myDeals").html();
            showSlides();
        } else {
            if (cardsContent === '') {
                renderProducts();
            } else {
                $("#myDeals").html(cardsContent);
            }
            cardsContent = "";
        }

    });
    $('#aboutUs,#help').on('click', function (e) {
        window.open('http://www.funcandi.com/')
    });

    $('#toLogin').on('click', function (e) {
        if ($("#login:hidden").length) {
            $('#login').slideDown();
            $('#login').css('display', 'block')
        } else {
            $('#login').slideUp();

        }
    });

    var typingTimer; //timer identifier
    var doneTypingInterval = 3000; //time in ms, 5 second for example
    var $input = $('#searched');
    //on keyup, start the countdown
    $input.on('keyup', function () {
        if ($("#searched").val() != "") {
            clearTimeout(typingTimer);
            $("#search div input").css('width', "73%");
            $("#search div span").html("Searching ...")
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }

    });
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        let value = $("#searched").val();
        if (value !== "") {
            $("#Amazon-cards").html("<i class='fa fa-spinner fa-spin preloader'></i><div class='filter-result'>Searching ...</div>");
            fetchSearchResult(value);
        }
    }


    $('#filter').on('click', function (e) {
        e.preventDefault()
        var age_filter = [];
        $(".age_check").each(function () {
            var self = $(this);
            if (self.is(':checked')) {
                age_value = (self.attr("value"));
                age_value_array = age_value.split(" ").map(Number)
                age_filter.push(age_value_array)
            }
        });
        var skills_filter = [];
        $(".skill_check").each(function () {
            var self = $(this);
            if (self.is(':checked')) {
                skills_filter.push(self.attr("value").toLowerCase());
            }
        });
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var price_range = [];
        price_range.push($('#slider-range').slider("values", 0))
        price_range.push($('#slider-range').slider("values", 1))
        shortlistToys(age_filter, skills_filter, price_range)
    });

    $(function () {
        $('#slider-range').slider({
            range: true,
            min: 100,
            max: 5000,
            step: 100,
            values: [500, 4000]
        });

        $('.ui-slider-range').append($('.range-wrapper'));

        $('.range').html('<span class="range-value">&#8377; ' + $('#slider-range').slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">&#8377; ' + $("#slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');
        $('#slider-range').slider({
            slide: function (event, ui) {


                $('.range').html('<span class="range-value">&#8377; ' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">&#8377; ' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

                var previousVal = parseInt($(this).data('value'));

                $(this).data({
                    'value': parseInt(ui.value)
                });
                if (ui.values[1] === 10000) {
                    if (!$('.range-alert').hasClass('active')) {
                        $('.range-alert').addClass('active');
                    }
                } else {
                    if ($('.range-alert').hasClass('active')) {
                        $('.range-alert').removeClass('active');
                    }
                }
            }
        });

        $('.range, .range-alert').on('mousedown', function (event) {
            event.stopPropagation();
        });

    });

    function shortlistToys(age_filter, skills_filter, price_range) {
        $('.tabs a').removeClass("active");
        let elem = $(".tabs #myDealsTab")
        elem.addClass('active');
        var href = elem.attr('href');
        var activeWidth = elem.innerWidth();
        var itemPos = elem.position();
        $(".selector").css({
            "left": itemPos.left + "px",
            "width": activeWidth + "px"
        });
        $("#Amazon-cards").html("<i class='fa fa-spinner fa-spin preloader'></i><div class='filter-result'>Hold On!, Fetching Toys</div>");
        filterOut(age_filter, skills_filter, price_range)
    }

});

function filterOut(age_filter, skills_filter, price_range) {
    var xhttp = new XMLHttpRequest();
    var html_content = "";
    xhttp.open("GET", "https://gettoys.herokuapp.com/get", true);
    xhttp.send();
    let container = document.getElementById("Amazon-cards");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var alreadyPresent = $('#Amazon-cards').html();
            var response = xhttp.responseText;
            data = JSON.parse(response);
            dataArray = []
            let products = []
            for (product in data) {
                dataArray.push(data[product])
            }
            for (i = 0; i < dataArray.length; i++) {
                for (j = 0; j < age_filter.length; j++) {
                    if (JSON.stringify(age_filter[j]) === JSON.stringify(dataArray[i]["age_group"])) {
                        products.push(dataArray[i])
                        break;
                    }
                }
            }
            if (products.length == 0) {
                products = dataArray
            }
            products = products.filter(function (item) {
                return item['price'] >= price_range[0] && item['price'] <= price_range[1]
            })
            if (products.length == 0) {
                noProductsFound();
            }
            Array.prototype.toLowerCase = function () {
                for (var i = 0; i < this.length; i++) {
                    this[i] = this[i].toString().toLowerCase();
                }
                return this;
            }
            let products_withSkills = []
            for (i = 0; i < products.length; i++) {
                for (j = 0; j < skills_filter.length; j++) {
                    if (products[i]['skills_tags'].toLowerCase().indexOf(skills_filter[j]) > -1) {
                        products_withSkills.push(products[i])
                        break
                    }
                }
            }
            if (products_withSkills.length == 0) {
                renderSearch(products)
            } else {
                createHTML(products_withSkills)
            }

        }
    };
}

var categories = ["Popular", "Trending", "On Sale", "Top Picks", "Featured"];

function fetchSearchResult(input) {
    var xhttp = new XMLHttpRequest();
    $("#search div input").css('width', "90%");
    $("#search div span").html("<i class='fa fa-search text-grey' aria-hidden='true'></i>")
    xhttp.open("GET", "https://gettoys.herokuapp.com/get/content/" + input, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var alreadyPresent = $('#Amazon-cards').html();
            var response = xhttp.responseText;
            data = JSON.parse(response);
            data = data["product"];
            if (data[0] == ("404")) {
                noProductsFound()
            } else {
                dataArray = []
                for (var i in data) {
                    dataArray.push(data[i])
                }
                renderSearch(dataArray)
            }
        }
    };
}

function renderSearch(dataArray) {
    if (dataArray.length == 0) {
        noProductsFound()
    } else if (dataArray.length > 10) {
        createHTML(dataArray.slice(0, 9))
    } else {
        createHTML(dataArray)
    }
}

function noProductsFound() {
    document.getElementById("Amazon-cards").innerHTML = (`<div class='notoys'><i class='fa fa-frown-o' aria-hidden='true'></i> No toys found!</div>`)
}

function createHTML(dataArray) {
    let container = document.getElementById("Amazon-cards");
    var html_content = "";
    for (var i = 0; i < dataArray.length; i++) {
        let product = dataArray[i];

        let price = Number(product["price"]);
        let discount = Math.floor(Math.random() * 50 + 5);
        let discountedPrice = Math.floor(price - (price * discount) / 100);


        html_content += `<div class=' row blog-card'>
        <div class='col-4 meta'>
            <div class='ribbon ribbon-top-left'><span>${categories[Math.floor(Math.random() * 5 + 0)]}
        </span></div>
            <div class='photo'>
                <img
                    src='${product['image_link']}'>
            </div>
            <div class=' ribbon-bottom-left'><span>`;
        html_content += product["age_group"][0] + "-" + product["age_group"][1];
        html_content += ` years</span></div>
    
        </div>
        <div class='col-8 row description'>
            <div class='col-6'>
                <p>`;
        let name = product["title"];
        var nameArr = name.split(" ", 2);
        name = nameArr.join(" ");
        html_content += name;
        html_content += `</p>
                <h6>&#8377;`;
        html_content += discountedPrice;
        html_content += `  <strike>&#8377;`;
        html_content += price;
        html_content += `</strike></h6>
                <small>`;
        html_content += product['description'].substring(0, 80);
        html_content += ` </small>
    
            </div>
            <div class='col-6 discount'>
                <a class='price ' href=`;
        html_content += product['amazon_link'];
        html_content += ` ><span>
                     `;
        html_content += discount;
        html_content += `% Discount </span>
         </a>
            <ul>
           <li>`;
        let skill = product['skills_tags'][0];
        skill = skill.charAt(0).toUpperCase() + skill.slice(1);
        html_content += skill
        html_content += `</li>
                    <li> `;
        skill = product['skills_tags'][1];
        skill = skill.charAt(0).toUpperCase() + skill.slice(1);
        html_content += skill;
        html_content += `</li>
                </ul>
            </div>
    
    
        </div>
    </div>`;
    }
    if (container != null) {
        container.innerHTML = "";
        container.innerHTML += html_content;
        activate_links()
    }
}

function renderProducts() {
    $("#searched").val('');
    var xhttp = new XMLHttpRequest();
    let spinner = "<i class='fa fa-spinner fa-spin preloader'></i>";
    $("#Amazon-cards").html(spinner);
    xhttp.open("GET", "https://gettoys.herokuapp.com/get", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var response = xhttp.responseText;
            data = JSON.parse(response)
            dataArray = []
            for (product in data) {
                dataArray.push(data[product])
            }
            //Generate no  of  Cards to show 
            var noOfProducts = Math.floor(Math.random() * 6 + 8);
            //Select indexes of cards to show
            let products = [];
            let toyCards = []
            while (products.length < noOfProducts) {
                var random = Math.floor(Math.random() * 84 + 0);
                if (products.indexOf(random) === -1) {
                    products.push(random);
                    toyCards.push(dataArray[random])
                }
            }
            createHTML(toyCards)
        }
    };
}
var index = 0

function showGetStartSlides() {
    var i;
    var slides = document.getElementsByClassName("getStartedSlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (index >= slides.length) {
        index = 0;
    }
    if (slides[index] != undefined) {
        slides[index].style.display = "block";
        index++;
        setTimeout(showGetStartSlides, 2800);
    }
}

var slideIndex = 0;

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slides[slideIndex] != undefined) {
        slides[slideIndex].style.display = "block";
        slideIndex++;
        setTimeout(showSlides, 2000);
    }
}

/* Profile Photo DropDown */
let element = document.querySelector('.mini-photo-wrapper');
if (element != null) {
    element.addEventListener('click', function () {
        document.querySelector('.menu-container').classList.toggle('active');
    });
}

function activate_links() {
    var links = document.getElementsByClassName("price");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            let target = this.getAttribute('href');
            window.open(target)
        }, false);
    }
}