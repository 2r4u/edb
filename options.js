var port=null;
let cldict={};
let cjdict={};
let links=[];
let cjsons=[];
function saveData(){
  links=Array.from(document.getElementsByClassName("link-input"));
  chrome.storage.sync.set({links: JSON.stringify(links)})
  for(let i=0; i<links.length; i++){
    cldict[classes[i]]=links[i].innerText;
  }
  chrome.storage.sync.set({classLinks: JSON.stringify(cldict)});
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
    cinput.innerText=cldict[cl];
    document.getElementById(cl).appendChild(cinput);
  });
}

function getJson(){
  port = chrome.runtime.connectNative('com.edb.scraper');
  console.log("sent message")
  port.postMessage({link: "", operation:"send"});
  port.onMessage.addListener(function (msg) {
    cjsons=JSON.parse(msg);
    console.log(cjsons);
    for(let i=0; i<cjsons.length; i++){
      cjdict[classes[i]]=cjsons[i];
    }
    console.log(cjdict);
    chrome.storage.sync.set({cjdict:JSON.stringify(cjdict)});
  });
  port.onDisconnect.addListener(function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
}

document.getElementById("save").addEventListener("click", saveData);
document.getElementById("get").addEventListener("click", getJson);
document.getElementById("scrape").addEventListener('click', () => {
  port = chrome.runtime.connectNative('com.edb.scraper');
  console.log("scraping links")
  links.forEach(link=>{
    port.postMessage({link: link, operation:"scrape"});
  });
  port.onDisconnect.addListener(function () {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
    }
  });
})
let classes;
retrieveData("links").then(function(item) {
  links=item;
});
retrieveData("cjdict").then(function(item) {
  cjdict=JSON.parse(item);
  console.log(cjdict)
});
retrieveData("classLinks").then(function(item) {
  cldict=JSON.parse(item);
  console.log(cldict);
});
retrieveData("classes").then(function(item) {
  classes=JSON.parse(item);
  console.log(classes);
  populate();
});
