function playMusic() {
  const music = document.getElementById("bgMusic");
  music.play();
}

// Play music and show gallery, then scroll to surprises
function playMusicAndShowGallery() {
  playMusic();
  const gallery = document.getElementById('gallery');
  if (gallery) gallery.style.display = 'block';
  setTimeout(() => {
    const surprises = document.getElementById('surprises');
    if (surprises) surprises.scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

// Scroll to surprises section
function scrollToSurprises() {
  const surprises = document.getElementById('surprises');
  if (surprises) surprises.scrollIntoView({ behavior: 'smooth' });
}

// Gallery slider logic
const galleryImages = [
  'assets/images/PNG3.jpeg',
  'assets/images/PNG1.jpeg',
  'assets/images/PNG2.jpeg',
'assets/images/PNG4.jpeg',
'assets/images/PNG5.jpeg',
'assets/images/PNG6.jpeg',
'assets/images/PNG7.jpeg',
'assets/images/PNG8.jpeg',
'assets/images/PNG9.jpeg',
'assets/images/PNG10.jpeg',
'assets/images/PNG11.jpeg',
'assets/images/PNG12.jpeg',
'assets/images/PNG13.jpeg',
'assets/images/PNG15.jpeg',
'assets/images/PNG16.jpeg',
'assets/images/PNG17.jpeg',
'assets/images/PNG18.jpeg'
  // Add more image paths as needed
];
let currentImage = 0;

function showGalleryImage() {
  const img = document.getElementById('galleryImage');
  if (img) img.src = galleryImages[currentImage];
}

function prevImage() {
  currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
  showGalleryImage();
}

function nextImage() {
  currentImage = (currentImage + 1) % galleryImages.length;
  showGalleryImage();
}

// Confetti animation over couple image
window.onload = function () {
  // Confetti code
  const img = document.querySelector('.main-image');
  const canvas = document.getElementById("confettiCanvas");
  if (!img || !canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;
    canvas.style.width = img.offsetWidth + "px";
    canvas.style.height = img.offsetHeight + "px";
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiCount = 150;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + (c.r / 4), c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + (c.r / 4));
      ctx.stroke();
    });
    update();
  }

  function update() {
    confetti.forEach((c) => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(draw, 20);

  // Show first gallery image if gallery exists
  showGalleryImage();
};