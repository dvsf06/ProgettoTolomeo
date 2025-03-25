const audio = document.querySelector('audio');
const durationIndicator = document.getElementById("durationIndicator");
const seekSlider = document.getElementById('seek-slider');
const currentTimeIndicator = document.getElementById('currentTime');
const playIconContainer = document.getElementById('play-button');

var playState = "play";

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


seekSlider.addEventListener('input', () => {
    currentTimeIndicator.textContent = calculateTime(seekSlider.value);
});
seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
});

audio.addEventListener('timeupdate', () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeIndicator.textContent = calculateTime(seekSlider.value);
});

playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
        audio.play();
        playState = 'pause';
    } else {
        audio.pause();
        playState = 'play';
    }
});

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    seekSlider.value = 0;
} else {
    audio.addEventListener('loadedmetadata', () => {
      displayDuration();
      setSliderMax();
      seekSlider.value = 0;
    });
}