var output = document.getElementById("output");
document.getElementById("btn1").onclick = function() {
  var a = new XMLHttpRequest();
  a.onreadystatechange = function() {
    if (this.readyState == 4) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      for (i = 0; i < myObj.length; i++) {
        output.innerHTML += myObj[i].firstName + " " + myObj[i].company + "<br>";
      }
    }
    console.log(myObj);
  }
  a.open("GET", "https://api.myjson.com/bins/1sne0", true);
  a.send();
}