var output = document.getElementById("output");
document.getElementById("btn1").onclick = function () {
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
        if (this.readyState == 4) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);
            for (i = 0; i < myObj.length; i++) {
                output.innerHTML += myObj[i].firstName + " " + myObj[i].company + "<br>";
            }
        }
    }
    a.open("POST", "ajax.php", true);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    a.send("a=foo&b=bar&c=1");
    
};