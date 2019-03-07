var a = 5;
var b = a + 10;
var output = document.getElementById("output");
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');

btn1.onclick = function (){
    a++;
    output.innerHTML = b + a;
}
btn2.onclick = function (){
    a--;
    output.innerHTML = b + a;
}
