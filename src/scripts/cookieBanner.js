/**
 * Simple cookie helper — replaces js-cookie dependency
 */
function setCookie(name, value, days) {
  const expires = days
    ? '; expires=' + new Date(Date.now() + days * 864e5).toUTCString()
    : '';
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

function removeCookie(name) {
  setCookie(name, '', -1);
}

export class CookieBanner {
  constructor() {
    this.banner = document.querySelector('.cookie-banner');
    this.bannerButton = document.querySelector('.cookie-banner__button');
    this.bannerClose = document.querySelector('.cookie-banner__close');
  }

  init() {
    if (!this.banner) return;

    if (getCookie('stp-cookies-accept')) {
      this.banner.remove();
    } else {
      this.banner.classList.add('cookie-banner--visible');
      this.bannerButton?.addEventListener('click', this.acceptCookies.bind(this));
      this.bannerClose?.addEventListener('click', this.acceptCookies.bind(this));
    }
  }

  acceptCookies() {
    setCookie('stp-cookies-accept', 'true', 730);
    this.banner.classList.remove('cookie-banner--visible');
  }

  resetCookie() {
    removeCookie('stp-cookies-accept');
  }
}
