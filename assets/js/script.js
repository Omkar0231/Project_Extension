document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
$(document).ready(function () {
    $('#toLogin').prop("disabled", true);
    $('.startButton').on('click', function () {
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

});


function callPreloader(element, time) {
    var content = $(element).html();
    $(element).html("<i class='fa fa-spinner fa-spin preloader'></i>");
    setTimeout(function () {
        $(element).html(content);
    }, time);
}

var slideIndex = 1;
showSlides(slideIndex);

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}