document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
$(document).ready(function () {

    //$('#toLogin').prop("disabled", true);


    // $('.startButton').on('click', function () {
    //     $('#getstarted').html("")
    //     $('#getstarted').css('display', 'none');
    //     $('#toLogin').prop("disabled", false);
    renderProducts();
    //     //callPreloader('#myDeals', 2000);

    // });
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    var selector = $(".tabs").find(".selector");
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
        callPreloader(href, 500);

        var activeWidth = $(this).innerWidth();
        var itemPos = $(this).position();
        $(".selector").css({
            "left": itemPos.left + "px",
            "width": activeWidth + "px"
        });
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

    $('#submitButton').on('click', function (e) {
        callPreloader('#myDeals', 500);
    });
    var search_icon = $("#search div span").html();
    var typingTimer; //timer identifier
    var doneTypingInterval = 3000; //time in ms, 5 second for example
    var $input = $('#searched');
    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        $("#search div input").css('width', "73%");
        $("#search div span").html("Searching ...")
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        let value = $("#searched").val();
        fetchSearchResult(value);
    }
   
    
    $(".ranges").on("change",function(){
        console.log("jn")
    })
console.log("hello",$(".ranges").val())
    


    $(function () {

        $('#slider-range').slider({
            range: true,
            min: 500,
            max: 10000,
            step: 500,
            values: [1000, 5000]
        });

        $('.ui-slider-range').append($('.range-wrapper'));

        $('.range').html('<span class="range-value">&#8377; ' + $('#slider-range').slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">&#8377; ' + $("#slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');
        $('.ui-slider-handle, .ui-slider-range').on('mousedown', function () {
            $('.gear-large').addClass('active');
        });
        $(document).on('mouseup', function () {
            if ($('.gear-large').hasClass('active')) {
                $('.gear-large').removeClass('active');
            }
        });

        var gearOneAngle = 0,
            gearTwoAngle = 0,
            rangeWidth = $('.ui-slider-range').css('width');

        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
        $('.gear-two').css('transform', 'rotate(' + gearTwoAngle + 'deg)');

        $('#slider-range').slider({
            slide: function (event, ui) {


                $('.range').html('<span class="range-value">&#8377; ' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">&#8377; ' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

                var previousVal = parseInt($(this).data('value'));

                $(this).data({
                    'value': parseInt(ui.value)
                });
                if (ui.values[0] == ui.value) {
                    if (previousVal > parseInt(ui.value)) {
                        gearOneAngle -= 7;
                        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    } else {
                        gearOneAngle += 7;
                        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    }

                } else {

                    if (previousVal > parseInt(ui.value)) {
                        gearOneAngle -= 7;
                        $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    } else {
                        gearOneAngle += 7;
                        $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    }

                }

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


});




var categories = ["Popular", "Trending", "On Sale", "Top Picks", "Featured"];

(function () {
    var parent = document.querySelector(".range-slider");
    if (!parent) return;
    var rangeS = parent.querySelectorAll("input[type=range]"),
        numberS = parent.querySelectorAll("input[type=number]");


    rangeS.forEach(function (el) {
        el.oninput = function () {
            console.log("hello", rangeS, numberS)

            var slide1 = parseFloat(rangeS[0].value),
                slide2 = parseFloat(rangeS[1].value);


            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
                // var tmp = slide2;
                // slide2 = slide1;
                // slide1 = tmp;
            }

            numberS[0].value = slide1;
            numberS[1].value = slide2;
        };
    });

    numberS.forEach(function (el) {
        el.oninput = function () {
            var number1 = parseFloat(numberS[0].value),
                number2 = parseFloat(numberS[1].value);

            if (number1 > number2) {
                var tmp = number1;
                numberS[0].value = number2;
                numberS[1].value = tmp;
            }

            rangeS[0].value = number1;
            rangeS[1].value = number2;
        };
    });
})();

function fetchSearchResult(input) {

    var xhttp = new XMLHttpRequest();
    $("#search div input").css('width', "90%");
    $("#search div span").html("<i class='fa fa-search text-grey' aria-hidden='true'></i>")
    $("#Amazon-cards").html("");
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
    document.getElementById("Amazon-cards").innerHTML = ("<div class='notoys'><i class='fa fa-frown-o' aria-hidden='true'></i> No toys found!</div>")
}

function createHTML(dataArray) {
    console.log(dataArray)
    var html_content = "";
    for (var i = 0; i < dataArray.length; i++) {
        let product = dataArray[i];

        let price = Number(product["price"]);
        let discount = Math.floor(Math.random() * 50 + 5);
        let discountedPrice = Math.floor(price - (price * discount) / 100);


        html_content += `<div class=' row blog-card'>
        <div class='col-4 meta'>
            <div class='ribbon ribbon-top-left'><span>`
        html_content += categories[Math.floor(Math.random() * 5 + 0)];
        html_content += `</span></div>
            <div class='photo'>
                <img
                    src='`;
        html_content += product['image_link'];
        html_content += ` '>
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
    //document.getElementById("Amazon-cards").innerHTML += html_content;
    //activate_links()

}

function renderProducts() {
    $("#searched").val('');
    var xhttp = new XMLHttpRequest();
    var html_content = "";
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
            while (products.length < noOfProducts) {
                var random = Math.floor(Math.random() * 84 + 0);
                if (products.indexOf(random) === -1)
                    products.push(random);
            }



            for (var i = 0; i < noOfProducts; i++) {
                var productIndex = products[i];
                let product = dataArray[productIndex];

                let price = Number(product["price"]);
                let discount = Math.floor(Math.random() * 50 + 5);
                let discountedPrice = Math.floor(price - (price * discount) / 100);


                html_content += `<div class=' row blog-card'>
                <div class='col-4 meta'>
                    <div class='ribbon ribbon-top-left'><span>`
                html_content += categories[Math.floor(Math.random() * 5 + 0)];
                html_content += `</span></div>
                    <div class='photo'>
                        <img
                            src='`;
                html_content += product['image_link'];
                html_content += ` '>
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
            // document.getElementById("Amazon-cards").innerHTML.replace(spinner, '')
            //document.getElementById("Amazon-cards").innerHTML += html_content;
            //activate_links()

        }
    };
}
let cardsContent = "";

function callPreloader(element, time) {
    var content = $(element).html();
    if (element.match("#myKid")) {
        cardsContent = $("#myDeals").html();
    }
    $(element).html("<i class='fa fa-spinner fa-spin preloader'></i>");
    setTimeout(function () {
        $(element).html(content);
        if (element.match("#myDeals")) {
            console.log("true")
            if (cardsContent === '') {
                $(element).html(content);
                renderProducts()
            } else
                $(element).html(cardsContent);
            cardsContent = "";
            //renderProducts();
        }
    }, time);
}

// var slideIndex = 0;
// showSlides();

// function showSlides() {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }

//     if (slideIndex >= slides.length) {
//         slideIndex = 0;
//     }

//     slides[slideIndex].style.display = "block";
//     slideIndex++;
//     setTimeout(showSlides, 2400);
// }

/* Profile Photo DropDown */

// document.querySelector('.mini-photo-wrapper').addEventListener('click', function () {
//     document.querySelector('.menu-container').classList.toggle('active');
// });

// function activate_links() {
//     var links = document.getElementsByClassName("price");
//     for (var i = 0; i < links.length; i++) {
//         links[i].addEventListener('click', function (event) {
//             console.log("log")
//             let target = this.getAttribute('href');
//             window.open(target)
//         }, false);
//     }
// }

