var audio = document.querySelector('audio');
const durationIndicator = document.getElementById("durationIndicator");
var seekSlider = document.getElementById('seek-slider');
const currentTimeIndicator = document.getElementById('currentTime');
const playIconContainer = document.getElementById('play-button');


var playState = "play";
seekSlider.value = 0;
var playerPointer;
var resp;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationIndicator.textContent = calculateTime(audio.duration);
}
const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const buttonNext = () => {
    playerPointer++;
    playId(playerPointer);
    audio.pause();
    audio.load();
    audio.play();
    setCookie("playerPointer", playerPointer);
}

const buttonPrev = () => {
    playerPointer--;
    playId(playerPointer);
    audio.pause();
    audio.load();
    audio.play();
    setCookie("playerPointer", playerPointer);
}

audio.addEventListener('ended',function(){
    playerPointer++;
    playId(playerPointer);
    audio.pause();
    audio.load();
    audio.play();
    setCookie("playerPointer", playerPointer);
});

window.addEventListener('load', function(){
    resp = JSON.parse(getCookie("playlist"));
    console.log(resp);
    playerPointer = getCookie("playerPointer");
    if(playerPointer == ""){playerPointer = 0;}
    console.log(playerPointer);
    playId(playerPointer);
    time = getCookie("currentTime");
    audio.pause();
    audio.load();
    audio.currentTime = time;
    seekSlider.value = time;
    audio.play();
    audio.muted = false;
})

function playId(id){
    var trackObj = resp[id];
    console.log(trackObj);
    audioPath = trackObj["percorsoFile"];
    coverLink = trackObj["coverImage"];
    audio = document.querySelector("audio");
    var coverContainer = document.getElementById("coverContainer");
    var nameContainer = document.getElementById("trackNameContainer");
    var artistContainer = document.getElementById("artistNameContainer");
    nameContainer.innerText = trackObj.titolo;
    artistContainer.innerText = trackObj.nomeArtista;
    coverContainer.src = coverLink;
    audio.src = "../" + audioPath;
    playState="pause";
}

seekSlider.addEventListener('input', () => {
    currentTimeIndicator.textContent = calculateTime(seekSlider.value);
});
seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
});

audio.addEventListener('timeupdate', () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeIndicator.textContent = calculateTime(seekSlider.value);
    setCookie("currentTime", audio.currentTime);
});

playIconContainer.addEventListener('click', () => {
    if(playState === 'pause') {
        audio.play();
        playState = 'play';
    } else {
        audio.pause();
        playState = 'pause';
    }
});

audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax();
    seekSlider.value = 0;
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name,value) {
    document.cookie = name + "=" + (value || "");
}