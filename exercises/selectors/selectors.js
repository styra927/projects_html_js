var myOutput = document.getElementById("output");
var myEl = document.querySelectorAll(".btn , li");
console.log(myEl);
for (i = 0; i < myEl.length; i++) {
    myEl[i].addEventListener("click", myFun);
}

function myFun() {
    this.style.backgroundColor = "pink";
}