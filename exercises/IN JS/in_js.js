  var output = document.getElementById("output");
  document.getElementById("btn1").onclick = function () {
      var a = new XMLHttpRequest();
      a.onreadystatechange = function () {
          if (this.readyState == 4) {
              var myObj = JSON.parse(this.responseText);
              console.log(myObj);
              for (i in myObj) {
                  output.innerHTML += myObj[i].id + " " + myObj[i].title + "<br>";
              }
          }
          //console.log(myObj);
      }
      a.open("GET", "http://jsonplaceholder.typicode.com/posts", true);

      a.send();
      /*
      for (i = 0; i < myObj.students.length; i++) {
        output.innerHTML += myObj.students[i].firstName + " " + myObj.students[i].company + "<br>";
      }
      */
  };