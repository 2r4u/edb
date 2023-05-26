let start = document.getElementById("start")

var port = null;

// function gotMessage(msg){
//     console.log('Received' + msg.text);
//     document.getElementById("output").innerText=msg.text;
// }

start.addEventListener('click', () => {
    port = chrome.runtime.connectNative('com.edb.nativehost');
    console.log("sent message")
    port.onMessage.addListener(function (msg) {
        console.log('Received ' + msg);
        if(msg.text='ready'){
            port.postMessage({text: 'Hello, my_application'});
        }
    });
    port.onDisconnect.addListener(function () {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
})


