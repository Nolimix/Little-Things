function adjustNavbarLayout() {
  const navLinks = document.querySelector('.nav-links');
  const navSocials = document.querySelector('.nav-socials');
  if (!navLinks || !navSocials) return;

  const width = window.innerWidth;
  // Même seuil que le CSS (@media (max-width: 900px)) : plus d'état "entre deux" à 900px pile
  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  // Si mobile → on ne touche pas aux marges/gaps dynamiques
  if (isMobile) {
    // On supprime juste les transitions pour éviter les glitchs visuels
    navLinks.style.transition = 'none';
    navSocials.style.transition = 'none';
    navLinks.style.marginLeft = '0';
    navSocials.style.marginRight = '0';
    navLinks.style.gap = '';
    navSocials.style.gap = '';
    return; // ⛔ on sort de la fonction
  }

  // 💡 Desktop : transitions fluides et ajustements progressifs
  navLinks.style.transition = 'margin-left 0.4s ease, gap 0.4s ease';
  navSocials.style.transition = 'margin-right 0.4s ease, gap 0.4s ease';

  // marginLeft des liens décalé vers la gauche (avant : 200 / 160 / 120 / 80). Les gaps entre liens ne changent pas.
  if (width >= 1600) {
    navLinks.style.marginLeft = '90px';
    navLinks.style.gap = '200px';
    navSocials.style.marginRight = '80px';
    navSocials.style.gap = '45px';
  } else if (width >= 1300) {
    navLinks.style.marginLeft = '80px';
    navLinks.style.gap = '150px';
    navSocials.style.marginRight = '60px';
    navSocials.style.gap = '40px';
  } else if (width >= 1100) {
    navLinks.style.marginLeft = '60px';
    navLinks.style.gap = '120px';
    navSocials.style.marginRight = '40px';
    navSocials.style.gap = '35px';
  } else if (width >= 900) {
    navLinks.style.marginLeft = '40px';
    navLinks.style.gap = '80px';
    navSocials.style.marginRight = '20px';
    navSocials.style.gap = '28px';
  } else if (width >= 700) {
    navLinks.style.marginLeft = '50px';
    navLinks.style.gap = '50px';
    navSocials.style.marginRight = '60px';
    navSocials.style.gap = '40px';
  } else {
    navLinks.style.marginLeft = '0';
    navLinks.style.gap = '20px';
    navSocials.style.marginRight = '0';
    navSocials.style.gap = '20px';
  }
}

// Exécution au chargement
window.addEventListener('load', adjustNavbarLayout);
window.addEventListener('resize', adjustNavbarLayout);
