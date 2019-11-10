chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({"installed": true}, function() {
        console.log('Value is set to ' + true);
      });


});
chrome.runtime.onSuspend.addListener(function () {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({
        text: ""
    });
});