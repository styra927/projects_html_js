var output = document.getElementById("output");
var a = "My Output<br>";
//Jan 1, 1970 00:00:00 UTC
document.getElementById("btn1").onclick = function() {
  var myDate = new Date();
  //Date.now()
  output.innerHTML = myDate.getDate();
};