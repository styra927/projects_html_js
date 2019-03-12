var output = document.getElementById("output");
var a = "My Output<br>";
var b = 3;
document.getElementById("btn1").onclick = function() {
  var myVal = document.getElementById("myVal").value;
  //myVal = parseInt(myVal);
  if (myVal === b) {
    a = a + " MyVal is equal to b<br>";
  }
  a = a + " MyVal is " + Math.round(myVal) + "<br>";
  a = a + " b is " + Math.round(b) + "<br>";
  a = a + Math.round(Math.random() * 100) + "<br>";
  output.innerHTML = a;
};