var myEle = document.createElement("h1");
var myContent = document.createTextNode("New Element");
var myOutput = document.getElementById("output");

myEle.appendChild(myContent);
myOutput.appendChild(myEle);

var myNodes = document.getElementById("wrapper").children;
console.log(myNodes);