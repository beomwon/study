// Hyperspeed background effect for #orb-canvas
const canvas = document.getElementById("orb-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const STAR_COUNT = 180;
const SPEED = 0.035;
const FOV = 400;
const CENTER = () => [canvas.width / 2, canvas.height / 2];

function randomStar() {
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * canvas.width * 0.4;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z: Math.random() * FOV,
    pz: 0,
  };
}

let stars = Array.from({ length: STAR_COUNT }, randomStar);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [cx, cy] = CENTER();

  for (let star of stars) {
    star.pz = star.z;
    star.z -= SPEED * FOV;
    if (star.z < 1) {
      Object.assign(star, randomStar());
      star.z = FOV;
      star.pz = star.z;
    }

    // Perspective projection
    const sx = (star.x / star.z) * FOV + cx;
    const sy = (star.y / star.z) * FOV + cy;
    const psx = (star.x / star.pz) * FOV + cx;
    const psy = (star.y / star.pz) * FOV + cy;

    ctx.strokeStyle = "rgba(160, 132, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(psx, psy);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

draw();
