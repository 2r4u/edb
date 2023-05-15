// Saves options to chrome.storage
function saveOptions(){
  const link = document.getElementById('link-input').value;
  chrome.storage.local.set({ calendarLink: link }).then(() => {
    console.log("Value is set to " + link);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions(){
  chrome.storage.local.get(["calendarLink"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
};
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);