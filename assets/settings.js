var wcSettings = $('#settings #wc input');

function updateSettings() {
    var filterstring = '';
    for (var i = wcSettings.length - 1; i >= 0; i--) {
        var t = wcSettings[i];
        if(t.dataset.type == 'filter'){
            filterstring += t.name + '(' + t.value + ')';
            if(t.value != localStorage[t.dataset.type + t.name]) {
                localStorage[t.parentElement.id + t.dataset.type + t.name] = t.value;
            }
        }
    }
    $('#webcam').css('filter', filterstring);
}

for (var i = wcSettings.length - 1; i >= 0; i--) {
    var t = wcSettings[i];
    if(localStorage[t.dataset.type + t.name]) {
        t.value = localStorage[t.parentElement.id + t.dataset.type + t.name];
    }
}
updateSettings();
