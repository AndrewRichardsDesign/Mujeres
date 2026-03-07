// ============================================
// Tab Navigation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`tab-${target}`).classList.add('active');

            // Stop all audio when switching tabs
            stopAllAudio();
        });
    });

    // ============================================
    // Audio Player
    // ============================================
    const players = document.querySelectorAll('.audio-player');
    let currentlyPlaying = null;
    const audioInstances = new Map();

    // Simulated audio duration (seconds) for demo
    const DEMO_DURATION = 30;

    players.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const progressTrack = player.querySelector('.progress-track');
        const progressFill = player.querySelector('.progress-fill');
        const timeDisplay = player.querySelector('.time-display');
        const audioId = player.dataset.audio;

        // Each player gets its own state
        const state = {
            playing: false,
            progress: 0,
            interval: null
        };
        audioInstances.set(audioId, { state, player, playBtn, progressFill, timeDisplay });

        playBtn.addEventListener('click', () => {
            if (state.playing) {
                pauseAudio(audioId);
            } else {
                // Stop any other playing audio first
                if (currentlyPlaying && currentlyPlaying !== audioId) {
                    pauseAudio(currentlyPlaying);
                }
                playAudio(audioId);
            }
        });

        // Click on progress bar to seek
        progressTrack.addEventListener('click', (e) => {
            const rect = progressTrack.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            state.progress = Math.max(0, Math.min(100, percentage));
            progressFill.style.width = state.progress + '%';
            timeDisplay.textContent = formatTime((state.progress / 100) * DEMO_DURATION);
        });
    });

    function playAudio(audioId) {
        const instance = audioInstances.get(audioId);
        if (!instance) return;

        const { state, playBtn, progressFill, timeDisplay } = instance;
        state.playing = true;
        playBtn.classList.add('playing');
        currentlyPlaying = audioId;

        // Simulate playback progress
        state.interval = setInterval(() => {
            state.progress += (100 / DEMO_DURATION) * 0.1; // Update every 100ms
            if (state.progress >= 100) {
                state.progress = 0;
                pauseAudio(audioId);
                return;
            }
            progressFill.style.width = state.progress + '%';
            timeDisplay.textContent = formatTime((state.progress / 100) * DEMO_DURATION);
        }, 100);
    }

    function pauseAudio(audioId) {
        const instance = audioInstances.get(audioId);
        if (!instance) return;

        const { state, playBtn } = instance;
        state.playing = false;
        playBtn.classList.remove('playing');
        clearInterval(state.interval);

        if (currentlyPlaying === audioId) {
            currentlyPlaying = null;
        }
    }

    function stopAllAudio() {
        audioInstances.forEach((_, audioId) => {
            pauseAudio(audioId);
        });
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ============================================
    // Card Flip
    // ============================================
    document.querySelectorAll('.flip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.photo-card');
            card.classList.toggle('flipped');
        });
    });
});
