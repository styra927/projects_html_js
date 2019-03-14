var output = document.getElementById("output");
var myObj = {
  "students": [{
    "firstName": "Laurence",
    "company": "Discoveryvip"
  }, {
    "firstName": "Mike",
    "company": "unknown"
  }, {
    "firstName": "John",
    "company": "Coder"
  }]

};

document.getElementById("btn1").onclick = function() {
  for (i = 0; i < myObj.students.length; i++) {
    output.innerHTML += myObj.students[i].firstName + " " + myObj.students[i].company + "<br>";
  }
};  