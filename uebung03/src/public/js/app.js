/*
MME2 Uebung 1 - Tom Oberhauser
*/

var player; //video player element
var btnPlay; //play/pause toggle button
var timeSlider;

window.onload = function() {
    player = document.getElementById("video");
    btnPlay = document.getElementById("btn-play");
    btnStop = document.getElementById("btn-stop");
    btnFullscreen = document.getElementById("btn-fullscreen");
    timeSlider = document.getElementById("timeSlider");
    btnPlay.addEventListener("click",togglePlayPause);
    btnStop.addEventListener("click",stopVideo);
    btnFullscreen.addEventListener("click",requestFullscreen);
    player.addEventListener("ended", updateButtons); //update play/pause button when video has finished
    player.addEventListener("timeupdate", updateTime);
    timeSlider.addEventListener("change", timeSliderChange);
    aufg01(); //console output for exercise 01
    updateButtons();
    updateTime();
};

var aufg01 = function() {
    console.log("eine beliebige Konsolenausgabe!!!");
};

var togglePlayPause = function() {
    if(player.paused) player.play(); else player.pause();
    updateButtons();
};

var stopVideo = function() {
    player.pause();
    player.currentTime = 0;
    updateButtons();
};

var updateTime = function() {
    document.getElementById("timeDisplay").value = createDateString(player.currentTime);
    var videoPercentage = player.currentTime / player.duration;
    timeSlider.value = videoPercentage;
};

// transforms seconds into HH:MM:SS
var createDateString = function(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);
    return padString(h) + ":" + padString(m) + ":" + padString(s);
};

// returns string with fixed length of two characters
var padString = function(s) {
    var temp = "0"+s;
    return temp.slice(-2);
};

var requestFullscreen = function() {
    /* https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode */
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    }
};

var updateButtons = function() {
    if(player.paused) btnPlay.innerHTML = "PLAY"; else btnPlay.innerHTML = "PAUSE";
};

var timeSliderChange = function() {
    player.currentTime = timeSlider.value * player.duration;
};
