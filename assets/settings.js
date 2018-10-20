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

    ($('#settings #body input[name="bgrotate"]')[0].checked ? $('body').addClass('rotate') : $('body').removeClass('rotate'));
    localStorage['bginputbgrotate'] = $('#settings #body input[name="bgrotate"]')[0].checked;

    ($('#settings #static input[name="static_layer"]')[0].checked ? vhs_static.playVideo() : vhs_static.stopVideo());
    localStorage['staticinputstatic_layer'] = $('#settings #static input[name="static_layer"]')[0].checked;
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

for (var i = $('#settings input').length - 1; i >= 0; i--) {
    var t = $('#settings input')[i];
    if(localStorage[t.parentElement.id + t.dataset.type + t.name]) {
        if(t.dataset.type = 'checkbox'){
            t.checked = localStorage[t.parentElement.id + t.dataset.type + t.name];
        }else{
            t.value = localStorage[t.parentElement.id + t.dataset.type + t.name];
        }
    }
}
