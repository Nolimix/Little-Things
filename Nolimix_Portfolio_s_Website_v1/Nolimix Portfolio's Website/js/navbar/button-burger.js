// --- Gestion du bouton burger & menu ---
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

function setMenu(isOpen) {
  navLinks.classList.toggle('open', isOpen);
  navbar.classList.toggle('hidden', isOpen);

  // Change le symbole (☰ ↔ ✖)
  burger.innerHTML = isOpen ? '&times;' : '&#9776;';
  burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

if (burger && navLinks && navbar) {
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));

  // Ferme le menu quand on clique sur un lien (sinon il reste ouvert par-dessus la page)
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  // Ferme le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
      setMenu(false);
    }
  });

  // Ferme le menu avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Si on repasse en affichage desktop (rotation, redimensionnement), on referme proprement
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}
