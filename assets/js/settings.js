function updateSettings() {
    var filterstring = '';
    for (var i = $('#settings #wc input').length - 1; i >= 0; i--) {
        var t = $('#settings #wc input')[i];
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
    for (var i = players.length - 1; i >= 0; i--) {
        if(playing) {
            players[i].pauseVideo();
        }else{
            players[i].playVideo();
        }
    }
    playing = !playing;
}

function updateTempo(value, updateBox) {
    if(value < 10 || value > 1000) return false;
    if(value != tempo){
        tempo = value;
        set_gifrotation();
        if(updateBox) $('#settings input[name=tempo]').val(tempo);
        $('body').css('animation-duration', (tempo/2) + 's');
        $('#webcam').css('animation-duration', (60/tempo*4*(10*3)) + 's');
        $('#videos').css('animation-duration', (60/tempo*4*(10*2)) + 's');
        console.log('tempo:', tempo, 'bpm');
        $('#bpm-preview').text(Math.round(tempo * 100) / 100 + 'bpm').css('opacity', 0.88);
    }
}

for (var i = $('#settings input').length - 1; i >= 0; i--) {
    var t = $('#settings input')[i];
    if(localStorage[t.parentElement.id + t.dataset.type + t.name]) {
        if(t.dataset.type == 'checkbox'){
            t.checked = localStorage[t.parentElement.id + t.dataset.type + t.name];
        }else{
            t.value = localStorage[t.parentElement.id + t.dataset.type + t.name];
        }
        if(t.name == 'tempo'){
            tempo = t.value;
        }
    }
}
