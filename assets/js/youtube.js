var times = [];
var players = [];

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function setupPlayer(name, playlist)
{
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
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onYouTubeIframeAPIReady()
{
    background = setupPlayer('background', 'PLTZu_i5Q06qBtm3XlJZm_WuViWJDF1l9h');
    videos = setupPlayer('videos', 'PLTZu_i5Q06qCtR4GwHMZIMQq-F1E4YBT9');
    players = [background,videos];
    $('#settings-info').css('opacity',0)
}

function onPlayerReady(event)
{
    event.target.playVideo();
    setTimeout(moreParameters, 1000);
}

function moreParameters()
{
    // Sue me
    for (var i = players.length - 1; i >= 0; i--)
    {
        players[i].mute();
        players[i].setShuffle(true);
        players[i].setPlaybackQuality('small');
    }
    videos.nextVideo();
    updateSettings();
}

function onPlayerStateChange(event)
{
    var target = event.target;
    var id = target.h.id;
    console.log(id, target.getPlayerState());
    var url = new URL(target.getVideoUrl());
    var videoId = url.searchParams.get('v');

    clearTimeout(window[id].out);

    if (event.data == YT.PlayerState.PLAYING)
    {
        $('#' + id).removeClass('hidden');
        if (times[videoId])
        {
            if (times[videoId]['start'] > target.getCurrentTime())
            {
                target.seekTo(times[videoId]['start']);
                console.log(id,'skipping to', times[videoId]['start']);
            }
            else if(times[videoId]['end'])
            {
                var timer = times[videoId]['end'] - target.getCurrentTime();
                window[id].out = setTimeout(function(){
                    target.nextVideo();
                }, timer * 1000);
                console.log(id, 'will be skipped in', timer);
            }
        }
        $('#np'+id).attr('href', 'https://youtube.com/watch?v=' + videoId).text(target.getVideoData().title);
    }
    else if (event.data == YT.PlayerState.BUFFERING)
        target.setPlaybackQuality('small');
    else if (event.data != YT.PlayerState.PAUSED)
        $('#' + id).addClass('hidden');
}

function onPlayerError(event)
{
    var target = event.target;
    var id = target.h.id;
    err0r(id + ' ' + target.getVideoUrl() + ' did not load. Error code: ' + event.data, event);
    target.nextVideo();
}

function newVideo()
{
    var arr = [];
    for (var i = players.length - 1; i >= 0; i--)
    {
        var target = players[i];
        arr[i] = target.getDuration();
        var url = new URL(target.getVideoUrl());
        var videoId = url.searchParams.get('v');
        if (times[videoId])
            if (times[videoId]['end']) arr[i] = times[videoId]['end'];
        arr[i] -= target.getCurrentTime();
    }
    players[Object.keys(arr).reduce(function(a, b){ return arr[a] < arr[b] ? a : b })].nextVideo();
}
