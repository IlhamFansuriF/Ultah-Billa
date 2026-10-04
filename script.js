document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const landingScreen = document.getElementById('landing-screen');
  const mainContent = document.getElementById('main-content');
  const giftBox = document.getElementById('gift-box');
  const btnOpen = document.getElementById('btn-open');
  
  // Audio Player Elements
  const bgMusic = document.getElementById('bg-music');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const btnMute = document.getElementById('btn-mute');
  const muteIcon = document.getElementById('mute-icon');
  const vinylDisk = document.getElementById('vinyl-disk');
  const trackStatus = document.getElementById('track-status');

  // Cake Elements
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  const candle = document.getElementById('candle');
  const wishMessage = document.getElementById('wish-message');

  // Gallery & Lightbox Elements
  const polaroidCards = document.querySelectorAll('.polaroid-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Love Rain Button
  const btnLoveRain = document.getElementById('btn-love-rain');

  // Generate background particles
  createBackgroundParticles();

  // Flag for gift state
  let isGiftOpened = false;

  // Attempt autoplay immediately on page load + first user interaction fallback
  attemptAutoPlayOnLoad();

  function attemptAutoPlayOnLoad() {
    if (!bgMusic) return;
    
    // Try playing immediately
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateAudioUI(true);
      }).catch(err => {
        console.log('Autoplay standard policy trigger required. Will auto-start on first click/touch.');
        
        // Listen to first click/touch anywhere on page to trigger audio immediately
        const startAudioOnFirstTouch = () => {
          bgMusic.play().then(() => {
            updateAudioUI(true);
          }).catch(e => console.log('Audio error:', e));
          
          document.removeEventListener('click', startAudioOnFirstTouch);
          document.removeEventListener('touchstart', startAudioOnFirstTouch);
        };

        document.addEventListener('click', startAudioOnFirstTouch, { once: true });
        document.addEventListener('touchstart', startAudioOnFirstTouch, { once: true });
      });
    }
  }

  // Unboxing Event Trigger
  btnOpen.addEventListener('click', openGift);
  giftBox.addEventListener('click', openGift);

  function openGift() {
    if (isGiftOpened) return;
    isGiftOpened = true;

    // Trigger lid opening animation
    giftBox.classList.add('open');

    // Fire Confetti explosion
    fireConfetti();

    // Ensure music is playing when gift is opened
    playMusic();

    // Transition landing screen out & main content in
    setTimeout(() => {
      landingScreen.classList.add('fade-out');
      mainContent.classList.remove('hidden');

      // Scroll to top of main content smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger secondary festive confetti shower
      setTimeout(fireConfetti, 800);
    }, 900);
  }

  // Audio Control Logic
  function playMusic() {
    if (!bgMusic) return;
    bgMusic.play().then(() => {
      updateAudioUI(true);
    }).catch(err => {
      console.log('Autoplay blocked by browser policy:', err);
      updateAudioUI(false);
    });
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    updateAudioUI(false);
  }

  function updateAudioUI(isPlaying) {
    if (isPlaying) {
      playIcon.className = 'fa-solid fa-pause';
      vinylDisk.classList.add('playing');
      trackStatus.textContent = 'Sedang diputar 🎵';
    } else {
      playIcon.className = 'fa-solid fa-play';
      vinylDisk.classList.remove('playing');
      trackStatus.textContent = 'Pause ⏸️';
    }
  }

  btnPlayPause.addEventListener('click', () => {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  btnMute.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    if (bgMusic.muted) {
      muteIcon.className = 'fa-solid fa-volume-xmark';
    } else {
      muteIcon.className = 'fa-solid fa-volume-high';
    }
  });

  // Confetti Animation Effect
  function fireConfetti() {
    if (typeof confetti !== 'function') return;

    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4081', '#e91e63', '#ffd700', '#ff80ab', '#ffffff']
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4081', '#ffd700']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e91e63', '#ff80ab']
      });
    }, 250);
  }

  // Interactive Candle Blow Out
  candle.addEventListener('click', blowCandle);
  flame.addEventListener('click', blowCandle);

  function blowCandle() {
    if (flame.classList.contains('off')) return;
    flame.classList.add('off');
    smoke.classList.remove('hidden');

    // Show Wish Message
    wishMessage.classList.remove('hidden');

    // Fire Confetti celebratory shower
    fireConfetti();

    setTimeout(() => {
      smoke.classList.add('hidden');
    }, 2000);
  }

  // Photo Lightbox Handling
  polaroidCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-img');
      const caption = card.querySelector('.polaroid-caption p');

      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption ? caption.textContent : 'Memory with Sabilah 💕';
      lightboxModal.classList.remove('hidden');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.add('hidden');
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.add('hidden');
    }
  });

  // Love Rain Action
  btnLoveRain.addEventListener('click', () => {
    createHeartShower();
    fireConfetti();
  });

  function createHeartShower() {
    const heartSymbols = ['💖', '💕', '💗', '💓', '🌸', '✨'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-shower';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.position = 'fixed';
        heart.style.top = '-50px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'transform 3s linear, opacity 3s linear';
        
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 100);
    }
  }

  // Background Particles Generator
  function createBackgroundParticles() {
    const container = document.getElementById('particles-bg');
    const heartTypes = ['💖', '🌸', '✨', '💕'];
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-heart';
      particle.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 5 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.fontSize = (Math.random() * 14 + 14) + 'px';
      container.appendChild(particle);
    }
  }
});
