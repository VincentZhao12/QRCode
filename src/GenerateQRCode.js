var data = document.getElementById("inputData");
var submit = document.getElementById("gen");
var img = document.getElementById("qr-code");

submit.onclick = function() {
    if(data.value.length > 0)
        img.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + data.value + "&amp;size=100x100";
}