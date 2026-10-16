document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  const filter = tab.dataset.filter;
  document.querySelectorAll('.card').forEach((card) => {
    card.style.display = filter === 'all' || card.dataset.cat === filter ? 'flex' : 'none';
  });
}));

const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.navlinks');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.mega>.mega-trigger').forEach((button) => button.addEventListener('click', (event) => {
  if (innerWidth > 900) return;
  event.preventDefault();
  const menu = button.parentElement;
  document.querySelectorAll('.mega.open').forEach((item) => item !== menu && item.classList.remove('open'));
  menu.classList.toggle('open');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('visible');
  observer.unobserve(entry.target);
}), { threshold: .12, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.section-head,.card,.sector,.process-step,.feature,.reveal,.reveal-left,.reveal-right').forEach((element, index) => {
  if (!element.classList.contains('reveal-left') && !element.classList.contains('reveal-right')) element.classList.add('reveal');
  element.style.setProperty('--delay', `${Math.min(index % 5, 4) * 65}ms`);
  observer.observe(element);
});

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    document.querySelector('.scroll-progress')?.style.setProperty('transform', `scaleX(${progress})`);
    document.documentElement.style.setProperty('--local-scroll', Math.min(scrollY, 1200));
    document.querySelector('.nav')?.classList.toggle('scrolled', scrollY > 28);
    ticking = false;
  });
}, { passive: true });
