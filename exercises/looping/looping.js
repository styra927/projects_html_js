var output = document.getElementById("output");
var a = "My Output<br>";
document.getElementById("btn1").onclick = function() {
  /*
  var i = 0;
  while (i < 5) {
    a = a + i + ". hello<br>";
    i++;
  }
*/
  for (i = 0; i < 5; i++) {
    a += i + ". hello<br>";
  }
  output.innerHTML = a;
};