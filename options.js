var port=null;

function saveData(){
  let data=document.getElementById("link-input").value;
  chrome.storage.sync.set({link: data});
}



function retrieveData(key){
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(key, function(items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[key]);
      }
    });
  });
}

document.getElementById("save").addEventListener("click", saveData);
document.getElementById("run").addEventListener('click', () => {
  port = chrome.runtime.connectNative('com.edb.scraper');
  console.log("sent message")
  port.postMessage({link: document.getElementById("link-input").value});
  port.onMessage.addListener(function (msg) {
    console.log('Received ' + msg);
  });
  port.onDisconnect.addListener(function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
})

retrieveData("link").then(function(item) {
  console.log(item);
});