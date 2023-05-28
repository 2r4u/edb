var port=null;
let cdict={};
function saveData(){
  let links=Array.from(document.getElementsByClassName("link-input"));
  for(let i=0; i<links.length; i++){
    cdict[classes[i]]=links[i].innerText;
  }
  chrome.storage.sync.set({classLinks: JSON.stringify(cdict)});
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

function populate(){
  classes.forEach(cl => {
    const crow=document.createElement("tr");
    crow.id=cl;
    document.getElementById("inputs").appendChild(crow);
    const cname=document.createElement("td");
    cname.innerText=cl;
    document.getElementById(cl).appendChild(cname);
    const cinput=document.createElement("td");
    cinput.contentEditable="true";
    cinput.classList.add("link-input");
    cinput.innerText="Enter link to calendar for "+cl;
    document.getElementById(cl).appendChild(cinput);
  });
}

document.getElementById("save").addEventListener("click", saveData);
document.getElementById("run").addEventListener('click', () => {
  port = chrome.runtime.connectNative('com.edb.scraper');
  console.log("sent message")
  port.postMessage({link: "", operation:"send"});
  port.onMessage.addListener(function (msg) {
    console.log('Received ' + msg);
  });
  port.onDisconnect.addListener(function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
})
document.getElementById("scrape").addEventListener('click', () => {
  port = chrome.runtime.connectNative('com.edb.scraper');
  console.log("sent message")
  port.postMessage({link: document.getElementById("link-input").value, operation:"scrape"});
  port.onMessage.addListener(function (msg) {
    console.log('Received ' + msg);
  });
  port.onDisconnect.addListener(function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
})
let classes;
retrieveData("classes").then(function(item) {
  classes=JSON.parse(item);
  console.log(classes);
  populate();
});
retrieveData("classLinks").then(function(item) {
  console.log(JSON.parse(item));
});