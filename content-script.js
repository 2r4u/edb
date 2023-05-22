let cframe=document.getElementsByTagName("c-wiz");
let classElements=[];
cframe.array.forEach(element => {
    if(element.hasAttribute("data-course-id")){
        classElements.push(element);
    }
});
console.log(classElements);