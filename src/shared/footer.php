<div class="container fixed-bottom z-10">
    <div class="audio-player">
        <!-- Track Info -->
        <div class="track-info">
            <img src="https://images.unsplash.com/photo-1616089883149-a928483f3953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxMb3N0JTIwaW4lMjB0aGUlMjBFY2hvZXMlMjAlMjhmZWF0LiUyMFN5bXBob255JTI5fGVufDB8MHx8fDE3MzQ4OTQwNjd8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Album Cover" class="track-image">
            <div>
                <div class="marquee">
                    <span class="h5 mb-1">Lost in the Echoes (feat. Symphony)</span>
                </div>
                <p class="text-muted mb-0">Electronic Dreams • Album Name</p>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar">
            <div class="progress"></div>
            <div class="progress-handle"></div>
        </div>

        <!-- Time Info -->
        <div class="d-flex justify-content-between time-info">
            <span>2:45</span>
            <span>4:30</span>
        </div>

        <!-- Controls -->
        <div class="controls">
            <button class="control-button">
                <i class="fas fa-random fa-lg"></i>
            </button>
            <button class="control-button">
                <i class="fas fa-step-backward fa-md"></i>
            </button>
            <button class="play-button">
                <i class="fas fa-play fa-md"></i>
            </button>
            <button class="control-button">
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