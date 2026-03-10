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
        mexicoCityMarker.on('click', function () {
            var selectedYear = document.getElementById('march-year').value;
            showPinModal('Mexico City', 'Mexico', selectedYear);
        });
    }

    var currentPinLocation = '';
    var currentPinYear = '';

    function showPinModal(city, location, year) {
        currentPinLocation = location;
        currentPinYear = year;

        document.getElementById('march-pin-modal-location').textContent = city;
        var lang = localStorage.getItem('voces8m-lang') || 'en';
        document.getElementById('march-pin-modal-date').textContent = lang === 'es' ? '8 de marzo, ' + year : 'March 8, ' + year;
        document.getElementById('march-pin-modal').style.display = 'flex';
    }

    function hidePinModal() {
        document.getElementById('march-pin-modal').style.display = 'none';
    }

    var pinModalOverlay = document.getElementById('march-pin-modal-overlay');
    var pinModalClose = document.getElementById('march-pin-modal-close');
    var pinModalBtn = document.getElementById('march-pin-modal-btn');

    if (pinModalOverlay) pinModalOverlay.addEventListener('click', hidePinModal);
    if (pinModalClose) pinModalClose.addEventListener('click', hidePinModal);
    if (pinModalBtn) {
        pinModalBtn.addEventListener('click', function () {
            hidePinModal();
            showMarchDetail(currentPinLocation, currentPinYear);
        });
    }

    function showMarchDetail(location, year) {
        var mapView = document.getElementById('march-map-view');
        var detailView = document.getElementById('march-detail-view');
        var titleEl = document.getElementById('march-location-title');
        var locationSelect = document.getElementById('march-detail-location');
        var yearSelect = document.getElementById('march-detail-year');

        titleEl.textContent = location + ' ' + year;
        yearSelect.value = year;

        var marchTabBtns = detailView.querySelectorAll('.march-tab-btn');
        var marchTabPanels = detailView.querySelectorAll('.march-tab-panel');
        marchTabBtns.forEach(function (b) { b.classList.remove('active'); });
        marchTabPanels.forEach(function (p) { p.classList.remove('active'); });
        marchTabBtns[0].classList.add('active');
        document.getElementById('march-tab-before').classList.add('active');

        mapView.style.display = 'none';
        detailView.style.display = 'block';
    }

    function hideMarchDetail() {
        var mapView = document.getElementById('march-map-view');
        var detailView = document.getElementById('march-detail-view');
        mapView.style.display = 'block';
        detailView.style.display = 'none';
        if (marchMap) {
            setTimeout(function () { marchMap.invalidateSize(); }, 100);
        }
    }

    var backBtn = document.getElementById('march-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', hideMarchDetail);
    }

    var marchDetailTabs = document.querySelectorAll('.march-tab-btn');
    marchDetailTabs.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.dataset.marchTab;
            marchDetailTabs.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            document.querySelectorAll('.march-tab-panel').forEach(function (p) { p.classList.remove('active'); });
            document.getElementById('march-tab-' + target).classList.add('active');
        });
    });

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('marchDetail')) {
        activateSection('march');
        setTimeout(function () {
            showMarchDetail(urlParams.get('marchDetail'), urlParams.get('marchYear') || '2026');
        }, 200);
    } else if (urlParams.get('marchLocation')) {
        activateSection('march');
        setTimeout(function () {
            showPinModal(urlParams.get('marchLocation'), urlParams.get('marchLocation'), urlParams.get('marchYear') || '2026');
        }, 200);
    }

    var detailYearSelect = document.getElementById('march-detail-year');
    if (detailYearSelect) {
        detailYearSelect.addEventListener('change', function () {
            var locationSelect = document.getElementById('march-detail-location');
            var location = locationSelect.options[locationSelect.selectedIndex].text;
            var titleEl = document.getElementById('march-location-title');
            titleEl.textContent = location + ' ' + detailYearSelect.value;
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
