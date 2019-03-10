var output = document.getElementById("output");
var a = "1";
document.getElementById("btn1").onclick = function() {
var myVal = document.getElementById("numA").value;
  if (myVal == "red" && a == 1) {
    myVal = "Wow its red or equal to the value of a :)";
  } else if (myVal == "blue") {
    myVal = "Wow its BLUE :)";
  } else {
    myVal = "not red or blue " + myVal;
  }
  output.innerHTML = myVal;
};