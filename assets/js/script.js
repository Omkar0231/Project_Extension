document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
$(document).ready(function () {
    
     $('#toLogin').prop("disabled", true);

    
    $('.startButton').on('click', function () {
        $('#getstarted').html("")
        $('#getstarted').css('display', 'none');
        $('#toLogin').prop("disabled", false);
        renderProducts();
        //callPreloader('#myDeals', 2000);

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

    
    
    $('#submitButton').on('click', function () {
        callPreloader('#myDeals', 500);
    });


    $('.price .price::after').on('click',function(){
        console.log("h")
        let target = (this).attr('href');
        window.open(target)
    });
    var typingTimer; //timer identifier
    var doneTypingInterval = 5000; //time in ms, 5 second for example
    

    //on keyup, start the countdown
    $("#searched").keyup(function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $("#searched").on('keydown', function () {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping() {
        let input=$("#searched").val();
        renderSearchResult(input);
        //do something
    }
    // $("#searched").keyup(function () {
    //     let input = $(this).val();
    //     renderSearchResult(input);
    // })
    $('#cowbell').on('click',function(){
        console.log("hello")
    })
});
(function() {
    var parent = document.querySelector(".range-slider");
    if (!parent) return;
    
    var rangeS = parent.querySelectorAll("input[type=range]"),
            numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function(el) {
        el.oninput = function() {
            var slide1 = parseFloat(rangeS[0].value),
                    slide2 = parseFloat(rangeS[1].value);
                    console.log("hello")

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

    numberS.forEach(function(el) {
        el.oninput = function() {
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
function renderSearchResult(input) {
    var xhttp = new XMLHttpRequest();
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
            dataArray = []
            for (var i in data) {
                dataArray.push(data[i])
            }
            // //Generate Cards
            var noOfProducts = dataArray.length;
            //Select cards to show


            document.getElementById("Amazon-cards").innerHTML = "";
            var categories = ["Popular", "Trending", "On Sale", "Top Picks", "Featured"];

            for (var i = 0; i < noOfProducts; i++) {
                // var productIndex = dataArray[i];
                let product = dataArray[i];
                console.log(product)
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
                document.getElementById("Amazon-cards").innerHTML += alreadyPresent;

            }

        }
    };
}

function renderProducts() {
    console.log("heere")
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
                htmll += `' >`
                //             <span>`;
                // htmll += discount;
                // htmll += `% Discount <br></span>
                   htmll+=`     </a>
            
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
              //  document.getElementById("Amazon-cards").innerHTML += htmll;
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

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    slides[slideIndex].style.display = "block";
    slideIndex++;
    setTimeout(showSlides, 2400); 
}

/* Profile Photo DropDown */

document.querySelector('.mini-photo-wrapper').addEventListener('click', function() {
    document.querySelector('.menu-container').classList.toggle('active');
  });


