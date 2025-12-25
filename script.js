const images = [
  "PNG1.jpeg","PNG2.jpeg","PNG3.jpeg","PNG4.jpeg",
  "PNG5.jpeg","PNG6.jpeg","PNG7.jpeg","PNG8.jpeg",
  "PNG9.jpeg","PNG10.jpeg","PNG11.jpeg","PNG12.jpeg",
  "PNG13.jpeg","PNG15.jpeg","PNG16.jpeg","PNG17.jpeg","PNG18.jpeg"
];

let index = 0;
let autoSlide;

function showImage() {
  const img = document.getElementById("galleryImage");
  img.classList.remove("fade");
  setTimeout(() => img.classList.add("fade"), 50);
  img.src = images[index];
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

function startAutoSlide() {
  autoSlide = setInterval(nextImage, 3500);
}

function playMusicAndStartGallery() {
  document.getElementById("bgMusic").play();
  showImage();
  startAutoSlide();
  document.getElementById("gallery-section")
    .scrollIntoView({ behavior: "smooth" });
}

/* Confetti */
window.onload = () => {
  showImage();
  const img = document.querySelector(".main-image");
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const confetti = Array.from({length:80}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*5+2,
    color: `hsl(${Math.random()*360},100%,70%)`
  }));

  setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c=>{
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
      ctx.fillStyle=c.color;
      ctx.fill();
      c.y+=1.5;
      if(c.y>canvas.height)c.y=-5;
    });
  },30);
};
