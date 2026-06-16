window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});

document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");
    if (target && target !== "#" && !target.startsWith("#")) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      setTimeout(() => {
        window.location.href = target;
      }, 350);
    }
  });
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const PARTICLE_COUNT = 400;
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width * 0.6;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.2 + 0.2;
    this.speedY = Math.random() * 0.3 + 0.05;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.flicker = Math.random() * 0.015;
  }
  update() {
    this.y -= this.speedY;
    this.opacity += (Math.random() - 0.5) * this.flicker;
    this.opacity = Math.min(Math.max(this.opacity, 0.05), 0.9);
    if (this.y < -10) {
      this.x = Math.random() * canvas.width * 0.6;
      this.y = canvas.height + 10;
    }
  }
  draw() {
    const fade = 1 - (this.x / (canvas.width * 0.7));
    ctx.fillStyle = "rgba(255,255,255," + (this.opacity * fade) + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

resizeCanvas();
initParticles();
animate();

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".menu a").forEach(link => {
  const linkPage = link.getAttribute("href").split("/").pop() || "index.html";
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});