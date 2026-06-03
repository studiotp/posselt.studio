/**
 * Custom project slider — modern contained fade slider
 */
export class SliderHandler {
  static init() {
    window.sliders = [];
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider, index) => {
      window.sliders.push(new SliderInstance(slider, index));
    });
  }
}

class SliderInstance {
  constructor(elem, index) {
    this.slider = elem;
    this.index = index;
    this.slidesContainer = elem.querySelector('.slider__slides');
    this.slides = elem.querySelectorAll('.slider__slide');
    this.currentSlide = 0;
    this.captionEl = elem.querySelector('.slide-caption');

    // Click navigation: left half = prev, right half = next
    this.slidesContainer?.addEventListener('click', (e) => {
      // Ignore clicks on interactive elements (play button, controls, links)
      if (e.target.closest('.big-play-button, .video-controls, a, button')) return;

      const rect = this.slidesContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) {
        this.goTo(this.currentSlide - 1);
      } else {
        this.goTo(this.currentSlide + 1);
      }
    });

    // Recalculate height on window resize
    window.addEventListener('resize', () => this.updateHeight());

    // Update height once images load inside this slider
    const images = this.slider.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        this.updateHeight();
      } else {
        img.addEventListener('load', () => this.updateHeight());
      }
    });

    // Update height once video metadata is available
    const videos = this.slider.querySelectorAll('video');
    videos.forEach((video) => {
      if (video.readyState >= 1) {
        this.updateHeight();
      } else {
        video.addEventListener('loadedmetadata', () => this.updateHeight());
      }
    });

    // Touch / swipe support
    this.initTouch();

    // Initial height + video handling
    this.updateHeight();
    this.playPauseVideo();
  }

  goTo(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.slides[this.currentSlide].classList.remove('slider__slide--active');
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('slider__slide--active');

    this.updateCaption();
    this.updateHeight();
    this.playPauseVideo();
  }

  updateHeight() {
    if (!this.slidesContainer) return;

    const active = this.slides[this.currentSlide];
    if (!active) return;

    const rect = active.getBoundingClientRect();
    if (rect.height > 0) {
      const currentMin = parseFloat(this.slidesContainer.style.minHeight) || 0;
      if (rect.height > currentMin) {
        this.slidesContainer.style.minHeight = `${rect.height}px`;
      }
    }
  }

  playPauseVideo() {
    this.slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video) video.pause();
    });

    const activeVideo = this.slides[this.currentSlide].querySelector('video');
    if (activeVideo) {
      const autoPlay = activeVideo.getAttribute('data-autoplay');
      if (autoPlay === 'true') {
        activeVideo.play();
      }
    }
  }

  updateCaption() {
    const captionData = this.slides[this.currentSlide].getAttribute('data-caption');
    if (captionData && this.captionEl) {
      this.captionEl.innerHTML = captionData;
    }
  }

  initTouch() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    const threshold = 50;     // min horizontal distance (px)
    const restraint = 100;    // max vertical distance (px) to qualify as horizontal swipe
    const allowedTime = 500;  // max time (ms) for a swipe

    this.slider.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      startX = touch.pageX;
      startY = touch.pageY;
      startTime = new Date().getTime();
    }, { passive: true });

    this.slider.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      const distX = touch.pageX - startX;
      const distY = touch.pageY - startY;
      const elapsedTime = new Date().getTime() - startTime;

      if (
        elapsedTime <= allowedTime &&
        Math.abs(distX) >= threshold &&
        Math.abs(distY) <= restraint
      ) {
        if (distX > 0) {
          this.goTo(this.currentSlide - 1);
        } else {
          this.goTo(this.currentSlide + 1);
        }
      }
    }, { passive: true });
  }
}
