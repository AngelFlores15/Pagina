// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email");

  if (!email) return;

  let canvas, ctx, confettis = [];
  let animationId;
  const confettiCount = 150;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createCanvas() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
  }

  function createConfetti() {
    confettis = [];
    for (let i = 0; i < confettiCount; i++) {
      confettis.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        r: random(2, 6),
        d: random(1, 3),
        color: `hsl(${random(0, 360)}, 100%, 50%)`,
        tilt: random(-10, 10),
        tiltAngle: 0,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
      ctx.stroke();
    });
    update();
    animationId = requestAnimationFrame(draw);
  }

  function update() {
    confettis.forEach((c) => {
      c.tiltAngle += 0.1;
      c.y += c.d;
      c.tilt = Math.sin(c.tiltAngle) * 10;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = random(0, canvas.width);
      }
    });
  }

  function startConfetti() {
    if (!canvas) createCanvas();
    createConfetti();
    draw();
  }

  function stopConfetti() {
    if (animationId) cancelAnimationFrame(animationId);
    if (canvas) {
      canvas.remove();
      canvas = null;
    }
  }

  email.addEventListener("mouseenter", startConfetti);
  email.addEventListener("mouseleave", stopConfetti);
});
