

function saveData(){
  let data=document.getElementById("link-input").value;
  chrome.storage.sync.set({link: data});
  console.log(data);
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

retrieveData("link").then(function(item) {
  console.log(item);
});