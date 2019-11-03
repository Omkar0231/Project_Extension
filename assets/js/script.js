document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
$(document).ready(function () {
    $('#toLogin').prop("disabled", true);

    renderProducts();
    $('.startButton').on('click', function () {
        $('#getstarted').html("")
        $('#getstarted').css('display', 'none');
        $('#toLogin').prop("disabled", false);

        callPreloader('#myDeals', 2000);

    });
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
        callPreloader(href, 1500);

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


    $(function () {

        $('#slider-range').slider({
            range: true,
            min: 0,
            max: 100,
            step: 10,
            values: [10, 30]
        });

        $('.ui-slider-range').append($('.range-wrapper'));

        $('.range').html('<span class="range-value">$ ' + $('#slider-range').slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">$ ' + $("#slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');
        $('.ui-slider-handle, .ui-slider-range').on('mousedown', function () {
            $('.gear-large').addClass('active');
        });


        $('#slider-range').slider({
            slide: function (event, ui) {


                $('.range').html('<span class="range-value">$ ' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">$ ' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

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

    $('#submitButton').on('click', function () {
        callPreloader('#myDeals', 500);
    });


    // $('.price').hover(function(){
    //     $(this).html(`<a class='price' href='https://singhrohaajay.co'> 
    //     <span>Buy Now <br></span>
    // </a>`);
    // });


});

function renderProducts() {
    var xhttp = new XMLHttpRequest();
    $("#Amazon-cards").html("<i class='fa fa-spinner fa-spin preloader'></i>");
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

            //Generate Cards
            var noOfProducts = Math.floor(Math.random() * 6 + 8);
            //Select cards to show
            let products = [];
            while (products.length < noOfProducts) {
                var random = Math.floor(Math.random() * 84 + 0);
                if (products.indexOf(random) === -1)
                    products.push(random);
            }
            // document.getElementById("Amazon-cards").innerHTML = "";
            var categories = ["Popular", "Trending", "On Sale", "Top Picks", "Featured"];

            for (var i = 0; i < noOfProducts; i++) {
                var productIndex = products[i];
                let product = dataArray[productIndex];

                let price = Number(product["price"]);
                let discount = Math.floor(Math.random() * 50 + 5);
                let discountedPrice = Math.floor(price - (price * discount) / 100);


                var htmll = `<div class=' row blog-card'>
                <div class='col-4 meta'>
                    <div class='ribbon ribbon-top-left'><span>`
                htmll += categories[Math.floor(Math.random() * 5 + 0)];
                htmll += `</span></div>
                    <div class='photo'>
                        <img
                            src='`;
                htmll += product['image_link'];
                htmll += ` '>
                    </div>
                    <div class=' ribbon-bottom-left'><span>`;
                htmll += product["age_group"][0] + "-" + product["age_group"][1];
                htmll += ` years</span></div>
            
                </div>
                <div class='col-8 row description'>
                    <div class='col-6'>
                        <p>`;
                let name = product["title"];
                var nameArr = name.split(" ", 2);
                name = nameArr.join(" ");
                htmll += name;
                htmll += `</p>
                        <h6>&#8377;`;
                htmll += discountedPrice;
                htmll += `  <strike>&#8377;`;
                htmll += price;
                htmll += `</strike></h6>
                        <small>`;
                htmll += product['description'].substring(0, 80);
                htmll += ` </small>
            
                    </div>
                    <div class='col-6 discount'>
                        <a class='price' href='`;
                htmll += product['amazon_link'];
                htmll += `' >
                            <span>`;
                htmll += discount;
                htmll += `% Discount <br></span>
                        </a>
            
                        <ul>
            
                            <li>`;
                let skill = product['skills_tags'][0];
                skill = skill.charAt(0).toUpperCase() + skill.slice(1);
                htmll += skill
                htmll += `</li>
                            <li> `;
                skill = product['skills_tags'][1];
                skill = skill.charAt(0).toUpperCase() + skill.slice(1);
                htmll += skill;
                htmll += `</li>
                        </ul>
                    </div>
            
            
                </div>
            </div>`;
                document.getElementById("Amazon-cards").innerHTML += htmll;
            }

        }
    };
}
let cardsContent = "";

function callPreloader(element, time) {
    var content = $(element).html();
    if (element.match("#myKid")) {
        cardsContent = $("#myDeals").html();
    }
    console.log(cardsContent)
    $(element).html("<i class='fa fa-spinner fa-spin preloader'></i>");
    setTimeout(function () {
        $(element).html(content);
        if (element.match("#myDeals")) {
            console.log("true")
            if (cardsContent==='') {
                $(element).html(content);
                renderProducts()
            } else
                $(element).html(cardsContent);
                cardsContent="";
            //renderProducts();
        }






    }, time);
}

// var slideIndex = 1;
// showSlides(slideIndex);

// function showSlides() {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1
//     }
//     slides[slideIndex - 1].style.display = "block";
//     setTimeout(showSlides, 3000); // Change image every 3 seconds
// }