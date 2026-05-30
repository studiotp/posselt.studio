/**
 * Custom project slider — ported from WordPress theme
 */
export class SliderHandler {
  static init() {
    window.sliders = [];
    const sliders = document.querySelectorAll('.slider');
    for (let i = 0; i < sliders.length; i++) {
      window.sliders.push(new SliderInstance(sliders[i]));
    }
  }
}

class SliderInstance {
  constructor(elem) {
    this.slider = elem;
    this.id = this.slider.id;
    this.prev = document.querySelector('#' + this.id + ' .slider__prev');
    this.next = document.querySelector('#' + this.id + ' .slider__next');
    this.slides = document.querySelectorAll('#' + this.id + ' .slider__slide');
    this.currentSlide = 0;
    this.counter = document.querySelector('#' + this.id + ' .slider__counter');
    this.buttons = document.querySelector('#' + this.id + ' .slider__buttons');

    this.calculateButtons();

    this.prev?.addEventListener('click', () => {
      this.slides[this.currentSlide].className = 'slider__slide';
      if (this.currentSlide === 0) {
        this.currentSlide = this.slides.length - 1;
      } else {
        this.currentSlide--;
      }
      this.slides[this.currentSlide].className = 'slider__slide slider__slide--active';
      this.updateCaption();
      this.playPauseVideo();
      this.calculateButtons();
    });

    this.next?.addEventListener('click', () => {
      this.slides[this.currentSlide].className = 'slider__slide';
      this.currentSlide++;
      this.currentSlide %= this.slides.length;
      this.slides[this.currentSlide].className = 'slider__slide slider__slide--active';
      this.updateCaption();
      this.playPauseVideo();
      this.calculateButtons();
    });
  }

  playPauseVideo() {
    let itemsProcessed = 0;
    this.slides.forEach((item, index, array) => {
      const video = item.querySelector('video');
      if (video) {
        video.pause();
      }
      itemsProcessed++;
      if (itemsProcessed === array.length) {
        this.playCurrentVideo();
      }
    });
  }

  playCurrentVideo() {
    const video = this.slides[this.currentSlide].querySelector('video');
    if (video) {
      const autoPlay = video.getAttribute('data-autoplay');
      if (autoPlay === 'true' || video.autoplay) {
        video.play();
      }
    }
  }

  calculateButtons() {
    let targetNode = null;
    const img = this.slides[this.currentSlide].querySelector('img');
    const video = this.slides[this.currentSlide].querySelector('video');

    if (img) {
      targetNode = img;
    } else {
      targetNode = video;
    }

    if (targetNode && this.buttons) {
      this.buttons.style.width = targetNode.clientWidth + 'px';
      this.buttons.style.height = targetNode.clientHeight + 'px';
    }
  }

  updateCaption() {
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    const captionEl = this.slides[this.currentSlide].parentNode?.parentNode?.parentNode?.querySelector('.slide-caption');
    if (captionEl) {
      const captionData = this.slides[this.currentSlide].getAttribute('data-caption');
      if (captionData) {
        captionEl.innerHTML = decodeHTML(captionData);
      }
    }
  }
}
