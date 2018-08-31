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
            iv_load_policy: 0,
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
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    event.target.mute();
    event.target.setPlaybackQuality('large');
    console.log(event.target.h.id, event.target.getPlayerState());
    if([1,2].indexOf(event.target.getPlayerState()) > -1){
        $('#' + event.target.h.id).removeClass('hidden');
    }else{
        $('#' + event.target.h.id).addClass('hidden');
        $('#webcam').removeClass('hidden');
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

function next(i)
{
    if(i == 1){
        background.nextVideo();
    }else if(i == 2){
        videos.playVideoAt(Math.floor(Math.random() * videos.getPlaylist().length));
    }
}
