const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5
  };
}

function drawHeart(h) {
  ctx.globalAlpha = h.opacity;
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  const topCurveHeight = h.size * 0.3;
  ctx.moveTo(h.x, h.y + topCurveHeight);
  ctx.bezierCurveTo(
    h.x, h.y,
    h.x - h.size / 2, h.y,
    h.x - h.size / 2, h.y + topCurveHeight
  );
  ctx.bezierCurveTo(
    h.x - h.size / 2, h.y + (h.size + topCurveHeight) / 2,
    h.x, h.y + (h.size + topCurveHeight) / 2,
    h.x, h.y + h.size
  );
  ctx.bezierCurveTo(
    h.x, h.y + (h.size + topCurveHeight) / 2,
    h.x + h.size / 2, h.y + (h.size + topCurveHeight) / 2,
    h.x + h.size / 2, h.y + topCurveHeight
  );
  ctx.bezierCurveTo(
    h.x + h.size / 2, h.y,
    h.x, h.y,
    h.x, h.y + topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) hearts.push(createHeart());
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].y -= hearts[i].speed;
    drawHeart(hearts[i]);
    if (hearts[i].y < -hearts[i].size) hearts.splice(i, 1);
  }
  requestAnimationFrame(updateHearts);
}

updateHearts();
