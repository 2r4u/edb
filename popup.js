let start = document.getElementById("start")

var port = null;

start.addEventListener('click', () => {
    port = chrome.runtime.connectNative('com.edb.scraper');
    onDisconnect();
})


function onDisconnect() {
    port.onDisconnect.addListener(function () {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
    });
}
