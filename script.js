document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Section Navigation (index.html)
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('.content-section');

    function activateSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return false;

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const matchingLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
        if (matchingLink) matchingLink.classList.add('active');

        sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');

        if (targetId === 'march') {
            setTimeout(function () {
                initMarchMap();
                if (marchMap) marchMap.invalidateSize();
            }, 150);
        }

        return true;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            e.preventDefault();
            if (activateSection(targetId)) {
                history.pushState(null, '', '#' + targetId);
            }
        });
    });

    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        activateSection(hashId);
    }

    window.addEventListener('popstate', () => {
        if (window.location.hash) {
            activateSection(window.location.hash.substring(1));
        } else {
            activateSection('participate');
        }
    });

    // ============================================
    // The March – Leaflet Map
    // ============================================
    let marchMap = null;

    function initMarchMap() {
        if (marchMap) return;
        const mapEl = document.getElementById('march-map');
        if (!mapEl) return;

        marchMap = L.map('march-map', {
            center: [20, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 18,
            worldCopyJump: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(marchMap);

        var mexicoCityMarker = L.marker([19.4326, -99.1332]).addTo(marchMap);
        mexicoCityMarker.bindPopup('<strong>Mexico City</strong><br><a href="march.html" style="color:#5150f7;font-weight:600;">View the march</a>');
        mexicoCityMarker.on('click', function () {
            mexicoCityMarker.openPopup();
        });
    }

    // ============================================
    // Tab Navigation (march.html)
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`tab-${target}`).classList.add('active');

            stopAllAudio();
        });
    });

    // ============================================
    // Audio Player
    // ============================================
    const players = document.querySelectorAll('.audio-player');
    let currentlyPlaying = null;
    const audioInstances = new Map();

    const DEMO_DURATION = 30;

    players.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const progressTrack = player.querySelector('.progress-track');
        const progressFill = player.querySelector('.progress-fill');
        const timeDisplay = player.querySelector('.time-display');
        const audioId = player.dataset.audio;

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
                if (currentlyPlaying && currentlyPlaying !== audioId) {
                    pauseAudio(currentlyPlaying);
                }
                playAudio(audioId);
            }
        });

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

        state.interval = setInterval(() => {
            state.progress += (100 / DEMO_DURATION) * 0.1;
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
