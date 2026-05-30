/**
 * Menu toggle and back-to-top logic
 */
export function initMenu() {
  const toggleMenu = document.querySelector('.js-toggle-menu');
  const menu = document.querySelector('.menu');
  const stp = document.querySelector('.corner--stp');
  const headerColour = document.querySelector('.header-colour');
  const headerColourBottom = document.querySelector('.header-colour--bottom');
  const main = document.querySelector('.main');
  const backToTop = document.querySelector('.back-to-top');
  const projects = document.querySelector('.projects');

  if (toggleMenu && menu) {
    toggleMenu.addEventListener('click', () => {
      menu.classList.toggle('menu--open');
      main?.classList.toggle('main--blur');
      headerColour?.classList.toggle('header-colour--hidden');
      headerColourBottom?.classList.toggle('header-colour--hidden');
      stp?.classList.toggle('corner--stp--menu-open');
      if (backToTop) {
        backToTop.classList.toggle('back-to-top--hidden');
      }
    });
  }

  if (backToTop && projects) {
    backToTop.addEventListener('click', () => {
      projects.scrollTop = 0;
    });
  }
}
