var webcam = document.querySelector("#webcam");

function setupWebcam(name) {
    name.style.height = window.innerHeight + 'px';
    name.style.width = window.innerWidth + 'px';

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            name.srcObject = stream;
        })
        .catch(function(err0r) {
            console.log("Something went wrong!");
        });
    }
}

setupWebcam(webcam);
