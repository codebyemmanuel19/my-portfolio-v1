// ============================================================
//   PROJECT.JS — CodeByEmmanuel Portfolio
// ============================================================


// ─── FADE IN ON LOAD ─────────────────────────────────────────

window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});


// ─── SMOOTH PAGE TRANSITIONS ─────────────────────────────────

document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");
    if (target && target !== "#" && !target.startsWith("#")) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      setTimeout(() => { window.location.href = target; }, 350);
    }
  });
});


// ─── PARTICLE BACKGROUND ─────────────────────────────────────

const canvas = document.getElementById("bg");
const ctx    = canvas.getContext("2d");

const PARTICLE_COUNT = 400;
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x       = Math.random() * canvas.width * 0.6;
    this.y       = Math.random() * canvas.height;
    this.size    = Math.random() * 1.2 + 0.2;
    this.speedY  = Math.random() * 0.3 + 0.05;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.flicker = Math.random() * 0.015;
  }

  update() {
    this.y -= this.speedY;
    this.opacity += (Math.random() - 0.5) * this.flicker;
    this.opacity  = Math.min(Math.max(this.opacity, 0.05), 0.9);
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
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

resizeCanvas();
initParticles();
animate();


// ─── SCROLL HINT — DYNAMIC COUNT ─────────────────────────────

const bioContent    = document.getElementById("bioContent");
const scrollHint    = document.getElementById("scrollHint");
const scrollHintText = document.getElementById("scrollHintText");
const totalProjects = document.querySelectorAll(".project-item").length;

function updateScrollHint() {
  if (!bioContent || !scrollHint) return;

  const scrolled   = bioContent.scrollTop;
  const itemHeight = bioContent.scrollHeight / totalProjects;

  // How many projects are fully scrolled past
  const seen      = Math.round(scrolled / itemHeight);
  const remaining = totalProjects - seen - Math.floor(bioContent.clientHeight / itemHeight);

  const atBottom = bioContent.scrollHeight - bioContent.scrollTop <= bioContent.clientHeight + 10;

  if (atBottom) {
    // Hide when at the bottom
    scrollHint.classList.add("hidden");
  } else {
    scrollHint.classList.remove("hidden");

    // Update text based on how many are left
    if (remaining <= 0) {
      scrollHintText.textContent = "Scroll up ↑";
    } else if (remaining === 1) {
      scrollHintText.textContent = "1 more project ↓";
    } else {
      scrollHintText.textContent = remaining + " more projects ↓";
    }
  }
}

if (bioContent) {
  bioContent.addEventListener("scroll", updateScrollHint);
  // Run once on load to set initial state
  updateScrollHint();
}


// ─── ACTIVE NAV LINK ─────────────────────────────────────────

const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";

document.querySelectorAll(".menu a").forEach(link => {
  const linkPage = link.getAttribute("href").split("/").pop().toLowerCase() || "index.html";
  if (linkPage === currentPage) link.classList.add("active");
});