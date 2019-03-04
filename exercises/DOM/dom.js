var myBtn2 = document.getElementById("btn2");
var myOutput = document.getElementById("output");
//myBtn2.onclick = myFun;
myBtn2.addEventListener("mouseover", myFun);

function myFun() {
    myOutput.innerHTML = "You clicked it";
    myOutput.style.backgroundColor = "green";
}

/*
console.dir(document);
console.log(document.URL + " " + document.title);

myOutput.innerHTML = "NEW CONTENT";
myOutput.style.color = "blue";
myOutput.style.backgroundColor = "purple";
myImg = document.getElementById("myImage");

var myBtn = document.getElementsByClassName("btn");
myBtn[1].innerText = "NEW<BR> BUTTON";
console.dir(myBtn[1]);

document.getElementById("btn1").addEventListener("click", function () {
    myImg.src = "http://lorempixel.com/100/200";
    this.innerHTML = "Clicked";
    this.style.backgroundColor = "yellow";
})
*/