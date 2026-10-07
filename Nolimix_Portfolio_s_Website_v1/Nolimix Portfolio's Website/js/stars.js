// Fond étoilé : 3 couches de profondeur, scintillement, parallaxe au scroll, étoile filante occasionnelle.
(() => {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LAYERS = [
    { density: 0.00035, r: [0.4, 0.9], drift: 2, parallax: 0.04 },
    { density: 0.00012, r: [0.8, 1.3], drift: 5, parallax: 0.10 },
    { density: 0.00003, r: [1.2, 2.0], drift: 9, parallax: 0.20 }
  ];
  let w, h, stars = [], scrollY = window.scrollY, shoot = null, nextShoot = 4000;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = [];
    LAYERS.forEach((L, i) => {
      const n = Math.round(w * h * L.density);
      for (let k = 0; k < n; k++) {
        stars.push({
          layer: i, x: Math.random() * w, y: Math.random() * h,
          r: L.r[0] + Math.random() * (L.r[1] - L.r[0]),
          phase: Math.random() * Math.PI * 2, speed: 0.0006 + Math.random() * 0.0018,
          color: Math.random() < 0.12 ? '246,166,35' : (Math.random() < 0.4 ? '170,200,255' : '255,255,255')
        });
      }
    });
    draw(performance.now());
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const L = LAYERS[s.layer];
      const y = (((s.y - scrollY * L.parallax - (reduce ? 0 : t / 1000 * L.drift)) % h) + h) % h;
      const a = reduce ? 0.8 : 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.fillStyle = `rgba(${s.color},${a})`;
      ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, Math.PI * 2); ctx.fill();
      if (s.layer === 2) {
        ctx.fillStyle = `rgba(${s.color},${a * 0.15})`;
        ctx.beginPath(); ctx.arc(s.x, y, s.r * 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (shoot) {
      const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14);
      g.addColorStop(0, `rgba(255,255,255,${shoot.life})`); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * 14, shoot.y - shoot.vy * 14); ctx.stroke();
      shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= 0.012;
      if (shoot.life <= 0) shoot = null;
    }
  }

  function loop(t) {
    if (!shoot && t > nextShoot) {
      shoot = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: 9, vy: 4, life: 1 };
      nextShoot = t + 7000 + Math.random() * 7000;
    }
    draw(t);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', () => { scrollY = window.scrollY; if (reduce) draw(0); }, { passive: true });
  resize();
  if (!reduce) requestAnimationFrame(loop);
})();
