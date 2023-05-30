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
                let upcomingAssignments=[];
                let digits="123456789".split();
                digits.push("10","11","12");
                let assingnmentAreas = Array.from(document.getElementsByClassName("lziZub"));
                for (let i = 0; i < assingnmentAreas.length; i++) {
                    if(assingnmentAreas[i].classList.contains("sdDCme")){
                        assingnmentAreas[i].classList.remove("sdDCme")
                        assingnmentAreas[i].innerHTML="";
                    }
                    let calendar= cjdict[classes[i]];
                    for(const key in calendar){
                        let ykey=""
                        if(digits.indexOf(key.substring(0,1))>=7){
                            ykey=key+"/"+(date.getFullYear()-1);
                        }
                        else if(digits.indexOf(key.substring(0,2))>-1){
                            ykey=key+"/"+(date.getFullYear()-1);
                        }
                        else{
                            ykey=key+"/"+date.getFullYear();
                        }
                        if(timeUntil(Date.parse(ykey))<=0&&timeUntil(Date.parse(ykey))>-7){
                            const span=document.createElement("span");
                            span.textContent=key+" - "+calendar[key];
                            assingnmentAreas[i].appendChild(span);
                            assingnmentAreas[i].appendChild(document.createElement("br"));
                        }
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
                if(classes.indexOf(element.innerText.split("\n")[0])==-1){
                    classes.push(element.innerText.split("\n")[0]);
                }
            });
            console.log(JSON.stringify(classes));
            chrome.storage.sync.set({ classes: JSON.stringify(classes) });
            console.log("saved classes")
        }
    }

}
function timeUntil(ms){
    // Calculate milliseconds in a day
    const date=new Date();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let msUntil=(Date.parse(date)-ms);
    return(Math.round(msUntil/day));
}

let classes =[];
retrieveData("classes").then(function(item){
    classes=JSON.parse(item);
});
window.addEventListener("load", scan, false);
window.addEventListener("load", inject, false);


