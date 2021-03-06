var qr = window.qrcode;

var video = document.createElement("video");
var canvasElement = document.getElementById("qr-canvas");
var canvas = canvasElement.getContext("2d");

var qrResult = document.getElementById("qr-result");
var outputData = document.getElementById("outputData");
var btnScanQR = document.getElementById("btn-scan-qr");

var goTo = document.getElementById("go-to-page");

var scanning = false;

goTo.onclick = function() {
    var url = outputData.innerText;
    try {
        new URL(url);
        window.open(url);
    } catch (_) {
        window.open("https://www.google.com/search?q=" + encodeURI(url));
    }
}

qr.callback = (res) => {
    if (res) {
        console.log(res);
        outputData.innerText = res;
        scanning = false;
  
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });
  
        qrResult.hidden = false;
        btnScanQR.hidden = false;
        canvasElement.hidden = true;
    }
  };

btnScanQR.onclick = () => navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    scanning = true;
    qrResult.hidden = true;
    btnScanQR.hidden = true;
    canvasElement.hidden = false;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.srcObject = stream;
    video.play();
    tick();
    scan();
});

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    scanning && requestAnimationFrame(tick);
}
  
function scan() {
    try {
        qrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
  }