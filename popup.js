let start = document.getElementById("start")

var port = null;

// function gotMessage(msg){
//     console.log('Received' + msg.text);
//     document.getElementById("output").innerText=msg.text;
// }

start.addEventListener('click', () => {
    port = chrome.runtime.connectNative('com.edb.scraper');
    console.log("sent message")
    port.onMessage.addListener(function (msg) {
        console.log('Received' + msg);
    });
    port.onDisconnect.addListener(function () {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
})


