var webcam = document.querySelector("#webcam");
var wc_status = false;

function setupWebcam(name)
{
    $(name).css('height', window.innerHeight + 'px');
    $(name).css('width', window.innerWidth + 'px');

    if (navigator.mediaDevices.getUserMedia)
    {
        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            name.srcObject = stream;
        })
        .catch(function(e) {
            err0r('Webcam error: ' + e.name + '-' + e.message, e);
        });
    }
    updateSettings();
}

function toggleWebcam()
{
    if (!webcam.srcObject)
        setupWebcam(webcam);
    else
        navigator.mediaDevices.getUserMedia({video: false})

    wc_status = !wc_status;

    if (wc_status)
        $('#settings [data-target="webcam"], #webcam').show();
    else
        $('#settings [data-target="webcam"], #webcam').hide();
}
