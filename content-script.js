function retrieveData(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, function (items) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                resolve(items[key]);
            }
        });
    });
}
function inject() {
    var jsInitChecktimer = setInterval(checkForJS_Finish, 111);
    function checkForJS_Finish() {
        if (document.querySelector(".lziZub")) {
            let cjdict={};
            clearInterval(jsInitChecktimer);
            retrieveData("cjdict").then(function (item) {
                console.log("loaded data: " + JSON.parse(item))
                cjdict = JSON.parse(item);
                const date=new Date();
                let assingnmentAreas = Array.from(document.getElementsByClassName("lziZub"));
                for (let i = 0; i < assingnmentAreas.length; i++) {
                    if(assingnmentAreas[i].classList.contains("sdDCme")){
                        assingnmentAreas[i].classList.remove("sdDCme")
                        assingnmentAreas[i].innerHTML="";
                    }
                    let calendar= cjdict[classes[i]];
                    for(const key in calendar){
                        let cdate=new Date(key);
                        if(date.getMonth)
                        //TODO: parse dates, show three closest assignments
                        const span=document.createElement("span");
                        span.textContent=contents[i];
                        assingnmentAreas[i].appendChild(span);
                    }
                    
                }
            });
            
        }
    }
}
function scan() {
    //add code to find classes and store them in an array in sync storage
    var jsInitChecktimer = setInterval(checkForJS_Finish, 111);
    function checkForJS_Finish() {
        if (document.querySelector(".gHz6xd")) {
            clearInterval(jsInitChecktimer);
            var classElements = Array.from(document.getElementsByClassName("gHz6xd"));
            console.log(classElements);
            classElements.forEach(element => {
                console.log(element.innerText.split("\n")[0]);
                classes.push(element.innerText.split("\n")[0]);
            });
            console.log(JSON.stringify(classes));
            chrome.storage.sync.set({ classes: JSON.stringify(classes) });
            console.log("saved classes")
        }
    }

}
let classes =[];
retrieveData("classes").then(function(item){
    classes=JSON.parse(item);
});
window.addEventListener("load", scan, false);
window.addEventListener("load", inject, false);


