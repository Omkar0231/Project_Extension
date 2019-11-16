chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ "value": "true" }, function () {
    });
});
chrome.runtime.onSuspend.addListener(function () {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({
        text: ""
    });
});