const galleryImages = [
  'PNG3.jpeg','PNG1.jpeg','PNG2.jpeg','PNG4.jpeg',
  'PNG5.jpeg','PNG6.jpeg','PNG7.jpeg','PNG8.jpeg',
  'PNG9.jpeg','PNG10.jpeg','PNG11.jpeg','PNG12.jpeg',
  'PNG13.jpeg','PNG15.jpeg','PNG16.jpeg','PNG17.jpeg','PNG18.jpeg'
];

let currentImage = 0;

function playMusic() {
  document.getElementById("bgMusic").play();
}

function playMusicAndShowGallery() {
  playMusic();
  document.getElementById("gallery").style.display = "block";
  showGalleryImage();
  setTimeout(scrollToSurprises, 400);
}

function scrollToSurprises() {
  document.getElementById("surprises").scrollIntoView({ behavior: "smooth" });
}

function showGalleryImage() {
  document.getElementById("galleryImage").src = galleryImages[currentImage];
}

function prevImage() {
  currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
  showGalleryImage();
}

function nextImage() {
  currentImage = (currentImage + 1) % galleryImages.length;
  showGalleryImage();
}

window.onload = () => {
  const img = document.querySelector('.main-image');
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const confetti = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 3,
    d: Math.random() * 120,
    color: `hsl(${Math.random() * 360},100%,70%)`
  }));

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += 2;
      if (c.y > canvas.height) c.y = -5;
    });
  }, 30);
};
