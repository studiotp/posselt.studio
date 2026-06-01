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
    this.prevBtn = elem.querySelector('.slider__prev');
    this.nextBtn = elem.querySelector('.slider__next');
    this.captionEl = elem.querySelector('.slide-caption');

    this.prevBtn?.addEventListener('click', () => this.goTo(this.currentSlide - 1));
    this.nextBtn?.addEventListener('click', () => this.goTo(this.currentSlide + 1));

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

    const img = active.querySelector('img');
    const video = active.querySelector('video');
    const containerWidth = this.slidesContainer.clientWidth;

    let height = 0;

    if (img && img.complete && img.naturalWidth) {
      height = (img.naturalHeight / img.naturalWidth) * containerWidth;
    } else if (video && video.videoWidth) {
      height = (video.videoHeight / video.videoWidth) * containerWidth;
    } else {
      // Fallback: use the active slide's bounding height if available
      const rect = active.getBoundingClientRect();
      if (rect.height > 0) {
        height = rect.height;
      }
    }

    if (height > 0) {
      this.slidesContainer.style.height = `${height}px`;
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
