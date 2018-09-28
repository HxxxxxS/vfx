var wcSettings = $('#settings #wc input');

function updateSettings() {
    var filterstring = '';
    for (var i = wcSettings.length - 1; i >= 0; i--) {
        var t = wcSettings[i];
        if(t.dataset.type == 'filter'){
            if(t.type == 'checkbox'){
                filterstring += t.name + '(' + (t.checked? 1 : 0) + ')';
                localStorage[t.parentElement.id + t.dataset.type + t.name] = t.checked ? 1 : 0;
            }else{
                filterstring += t.name + '(' + t.value + ')';
                localStorage[t.parentElement.id + t.dataset.type + t.name] = t.value;
            }
        }else{
            if(t.name == 'rotate'){
                $('#'+t.dataset.target).css('transform', 'rotate(' + 180 * (t.checked ? 1 : 0) + 'deg)');
            }else{
                $('#'+t.dataset.target).css(t.name,t.value);
            }
        }
    }
    $('#webcam').css('filter', filterstring);
}

var playing = true;

function playPause() {
    var vids = [background, videos, vhs_static];
    for (var i = vids.length - 1; i >= 0; i--) {
        if(playing) {
            vids[i].pauseVideo();
        }else{
            vids[i].playVideo();
        }
    }
    playing = !playing;
}

for (var i = wcSettings.length - 1; i >= 0; i--) {
    var t = wcSettings[i];
    if(localStorage[t.dataset.type + t.name]) {
        t.value = localStorage[t.parentElement.id + t.dataset.type + t.name];
    }
}
updateSettings();
