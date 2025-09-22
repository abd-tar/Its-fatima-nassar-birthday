// Change her name
document.getElementById("name").textContent = "Fatima Nassar"; // ← CHANGE THIS!

// === EMOJI BOMB — ONE EXPLOSION, LASTS 3 SECONDS ===
const explosionContainer = document.getElementById("emoji-explosion");
const emojis = ['🎉', '🎈', '✨', '💖', '🌟','🎉', '🌸', '🎀', '💝','🎉'];
//emojies :  '🎂',
function createEmoji(x, y, size, speed, delay) {
  const emoji = document.createElement('div');
  emoji.className = 'emoji';
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.position = 'fixed';
  emoji.style.left = `${x}px`;
  emoji.style.top = `${y}px`;
  emoji.style.fontSize = `${size}px`;
  emoji.style.pointerEvents = 'none';
  emoji.style.zIndex = '1000';
  emoji.style.opacity = '1';
  emoji.style.transformOrigin = 'center';

  // Animation: explode outward, fade out over 3s
  emoji.style.animation = `explodeOut ${speed}s cubic-bezier(0.16, 1, 0.3, 1) forwards`;

  document.body.appendChild(emoji);

  // Remove after animation ends
  setTimeout(() => {
    emoji.remove();
  }, speed * 1500);
}

// Launch the bomb — centered on screen
function launchBomb() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Fire 80 emojis in a 3-second burst
  for (let i = 0; i < 80; i++) {
    const angle = (i / 80) * Math.PI * 2;
    const distance = 80 + Math.random() * 150;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    const size = 20 + Math.random() * 20;
    const speed = 3; // Exactly 3 seconds duration
    const delay = (i / 80) * 0.3; // Stagger start up to 0.3s

    setTimeout(() => {
      createEmoji(x, y, size, speed, delay);
    }, delay * 1000);
  }

  // Optional: Play soft chime
  const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YU9vT18=');
  audio.volume = 0.1;
  audio.play().catch(() => {});
}

// Trigger bomb when page loads
window.addEventListener('load', () => {
  setTimeout(launchBomb, 1000); // Wait a bit for page to render
});

// === CANDLE BLOW ===
document.getElementById("blowBtn").addEventListener("click", () => {
  const flame = document.querySelector(".flame");
  flame.style.opacity = "0";
 
  setTimeout(() => {
    alert("🎈 Happy Birthday, Fatima! 🎂\n\nMay your year be filled with joy, love, and endless cupcakes!");
    flame.style.display='none';
  }, 1500);
//   after this i need a clap or congrats another time 
});

// === VIDEO PLAYER ===
function playVideo(videoUrl) {
  if (confirm("Open video message?")) {
    window.open(videoUrl, "_blank");
  }
}
// === MUSIC CONTROLLER ===
const musicToggle = document.getElementById('music-toggle');
const musicOptions = document.querySelectorAll('.music-btn, .music-stop');
const musicPlayer = new Audio(); // Single player, reused

// Load first song by default (optional)
musicPlayer.src = 'music/01-Monk-Turner-Fascinoma-Its-Your-Birthday(chosic.com).mp3';
musicPlayer.volume = 0.15;

// Play button
musicToggle.addEventListener('click', () => {
  document.querySelector('.music-options').style.display = 
    document.querySelector('.music-options').style.display === 'flex' ? 'none' : 'flex';
});

// Handle music selection
musicOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    // If stop button
    if (btn.hasAttribute('data-stop')) {
      musicPlayer.pause();
      musicPlayer.src = '';
      document.querySelectorAll('.music-btn').forEach(b => b.classList.remove('active'));
      return;
    }

    // If music button
    const src = btn.getAttribute('data-src');
    if (musicPlayer.src.includes(src)) {
      // Toggle play/pause if already selected
      if (musicPlayer.paused) {
        musicPlayer.play().catch(e => console.log("Playback blocked — tap again to play."));
      } else {
        musicPlayer.pause();
      }
    } else {
      // Change song
      musicPlayer.src = src;
      musicPlayer.play().catch(e => console.log("Playback blocked — tap again to play."));
      document.querySelectorAll('.music-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });
});

// Optional: Auto-play on load (softly)
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    musicPlayer.play().catch(e => {
      // If blocked, show hint in toggle button
      musicToggle.textContent = '🎵';
    });
  }, 1500);
});
// === FULL-SCREEN IMAGE MODAL ===
const modal = document.getElementById('imageModal');
const modalImg = document.querySelector('.modal-image');
const closeBtn = document.querySelector('.close-btn');

// Get all gallery images
const galleryImages = document.querySelectorAll('.photo-grid img');

// When any image is clicked
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    document.body.style.overflow = 'hidden'; // Prevent scroll behind modal
  });
});

// Close modal when clicking X
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
// Hidden note that appears after 24 hours
const laterNote = document.getElementById('later-note');
const storedTime = localStorage.getItem('birthdayVisited');

if (!storedTime) {
  localStorage.setItem('birthdayVisited', Date.now().toString());
} else {
  const visited = new Date(parseInt(storedTime));
  const now = new Date();
  const hoursDiff = (now - visited) / (1000 * 60 * 60);

  if (hoursDiff >= 24) {
    laterNote.textContent = "P.S. I hope today was as sweet as you are. I’ll always remember this moment — even if we don’t talk every day.";
    laterNote.style.opacity = '1';
  }

}


