import './style.css';

const slides = document.querySelectorAll('.slide');
const total = slides.length;
let current = 0;

const sections = [
  'Title Slide', 'Opening Question', 'My Story', 'PH Industry Overview', 'Reality Check',
  'The Twist', 'Growth Opportunities', 'Filipino Builders', 'Skills to Build',
  'English is the New Code', 'The Real Question', 'The Wage Premium', 'Your 4 Action Steps', 'Closing — The Choice'
];

function goTo(n) {
  slides[current].classList.remove('active');
  current = Math.max(0, Math.min(n, total - 1));
  slides[current].classList.add('active');
  document.getElementById('title-num').textContent = current + 1;
  document.getElementById('status-slide').textContent = 'Slide ' + (current + 1) + ' of ' + total;
  document.getElementById('status-section').textContent = sections[current] || '';
}

document.getElementById('tb-prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('tb-next').addEventListener('click', () => goTo(current + 1));
document.getElementById('nav-prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('nav-next').addEventListener('click', () => goTo(current + 1));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(current - 1); }
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End') goTo(total - 1);
});

let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
});

function updateClock() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('clock-text').textContent = h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
}
updateClock();
setInterval(updateClock, 10000);
