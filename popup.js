let start = document.getElementById("start")

var port = null;

start.addEventListener('click', () => {
    port = chrome.runtime.connectNative('com.edb.scraper');
    port.onMessage.addListener(function (msg) {
        console.log('Received' + msg);
        document.getElementById("output").innerText=msg;
    });
    port.onDisconnect.addListener(function () {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
    });
})
