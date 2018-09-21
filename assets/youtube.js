var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function setupPlayer(name, playlist) {
    return new YT.Player(name, {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: 
        {
            listType:'playlist',
            list: playlist,
            controls: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            showinfo: 0,
            disablekb: 1,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onYouTubeIframeAPIReady() {
    background = setupPlayer('background', 'PLTZu_i5Q06qBtm3XlJZm_WuViWJDF1l9h');
    videos = setupPlayer('videos', 'PLTZu_i5Q06qCtR4GwHMZIMQq-F1E4YBT9');
    vhs_static = setupPlayer('vhs_static', 'PLTZu_i5Q06qCbogWL2EzhXO7gKi2NFNfB');
    players = [background,videos,vhs_static];
    $('#settings-info').css('opacity',0)
}

function onPlayerReady(event) {
    event.target.playVideo();
    setTimeout(moreParameters, 1000);
}

function moreParameters(){
    // Sue me
    for (var i = players.length - 1; i >= 0; i--) {
        players[i].mute();
        players[i].setPlaybackQuality('medium');
    }
    videos.setShuffle(true);
    vhs_static.setShuffle(true);
}

var error;

function onPlayerStateChange(event) {
    console.log(event.target.h.id, event.target.getPlayerState());
    if([1,2].indexOf(event.target.getPlayerState()) > -1){
        $('#' + event.target.h.id).removeClass('hidden');
        clearTimeout(error);
    }else{
        $('#' + event.target.h.id).addClass('hidden');
        error = setTimeout(function(event) {
            console.log('error: Video did not load for 10 seconds:', event.target.getVideoUrl());
            $('#settings #errors').append('<li><b>Error:</b> Video did not load for 10 seconds: <a href="'+event.target.getVideoUrl()+'">'+event.target.getVideoUrl()+'</a></li>');
            event.target.nextVideo();
        }, 10000);
    }
}

function stopVideo(player) {
    player.stopVideo();
}

function stop() {
    background.stopVideo();
    videos.stopVideo();
    vhs_static.stopVideo();
}

function next(player)
{
    player.nextVideo();
}
