chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ "value": "true" }, function () {
    });
});
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url: '../homePage/index.html'});
  });
chrome.runtime.onSuspend.addListener(function () {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({
        text: ""
    });
});