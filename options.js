document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("link-input").innerText = items.data;
    }
  });
}

document.getElementById("save").onclick = function() {
  var d = document.getElementById("link-input").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
}