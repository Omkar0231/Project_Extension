chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed for the first time");

    $('#toLogin').prop("disabled", true);
    $('.startButton').on('click', function () {
        $('#getstarted').html("")
        $('#getstarted').css('display', 'none');
        $('#toLogin').prop("disabled", false);
        renderProducts()

    });

});