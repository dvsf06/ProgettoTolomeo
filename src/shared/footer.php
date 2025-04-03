<div class="container fixed-bottom z-10">
    <div class="audio-player">
        <audio src='' preload=”metadata” autoplay muted></audio>
        <!-- Track Info -->
        <div class="track-info">
            <img src="" alt="Album Cover" class="track-image" id="coverContainer">
            <div class="track-info-text">
                <div class="marquee" id=>
                    <span class="h5 mb-1" id="trackNameContainer"></span>
                </div>
                <p class="text-muted mb-0" id="artistNameContainer"></p>
            </div>
        </div>

        <div class="controls-container">
            <!-- Progress Bar -->
            <input type="range" class="progress-bar" id="seek-slider">

            <!-- Time Info -->
            <div class="d-flex justify-content-between time-info">
                <span id="currentTime">0:00</span>
                <span id="durationIndicator">4:30</span>
            </div>

            <!-- Controls -->
            <div class="controls">
                <button class="control-button">
                    <i class="fas fa-random fa-lg"></i>
                </button>
                <button class="control-button" onclick="buttonPrev()">
                    <i class="fas fa-step-backward fa-md"></i>
                </button>
                <button class="play-button" id="play-button">
                    <i class="fas fa-play fa-md"></i>
                </button>
                <button class="control-button" onclick="buttonNext()">
                    <i class="fas fa-step-forward fa-md"></i>
                </button>
                <div class="volume-control">
                    <button class="control-button">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <div class="volume-slider">
                        <div class="volume-level"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="assets/scripts/playerScript.js"></script>
<script>
    // Toggle play/pause button
    const playButton = document.querySelector('.play-button');
    let isPlaying = false;

    playButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playButton.innerHTML = isPlaying ? 
            '<i class="fas fa-pause fa-lg"></i>' : 
            '<i class="fas fa-play fa-lg"></i>';
    });
</script>