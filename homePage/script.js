$(document).ready(function () {
   
    $('#dealsTab').on('click', function () {
        $('#myKidContent').css('z-index', '5');
        $('#myDealsContent').css('z-index', '10');

    });
    
    $('#kidsTab').on('click', function () {
        $('#myDealsContent').css('z-index', '5');
        $('#myKidContent').css('z-index', '10');

    });
})