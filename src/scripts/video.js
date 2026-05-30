/**
 * Custom video player controls — ported from WordPress theme
 */
export class VideoHandler {
  static init() {
    window.vids = [];
    const videoElems = document.querySelectorAll('.videowithcontrols');
    for (let v = 0; v < videoElems.length; v++) {
      window.vids.push(new VideoInstance(videoElems[v]));
    }
  }
}

class VideoInstance {
  constructor(elem) {
    this.video = elem;
    this.id = this.video.id;
    this.isFullScreen = false;
    this.willUnPause = false;

    this.videoPlayer = document.querySelector('#' + this.id + ' .video-player');
    this.bigPlayButton = document.querySelector('#' + this.id + ' .big-play-button-icon');

    this.iconPlayCircle = '<use xlink:href="#svg_playCircle"/>';
    this.iconPauseCircle = '<use xlink:href="#svg_pauseCircle"/>';

    if (!this.videoPlayer || !this.bigPlayButton) return;

    this.videoPlayer.addEventListener('play', () => {
      this.bigPlayButton.style.visibility = 'visible';
      this.bigPlayButton.innerHTML = this.iconPauseCircle;
      this.bigPlayButton.parentNode.classList.add('playing');
    });

    this.videoPlayer.addEventListener('pause', () => {
      this.bigPlayButton.style.visibility = 'visible';
      this.bigPlayButton.innerHTML = this.iconPlayCircle;
      this.bigPlayButton.parentNode.classList.remove('playing');
    });

    this.bigPlayButton.addEventListener('click', () => {
      if (this.videoPlayer.paused) {
        this.videoPlayer.play();
        this.bigPlayButton.innerHTML = this.iconPauseCircle;
      } else {
        this.videoPlayer.pause();
        this.bigPlayButton.innerHTML = this.iconPlayCircle;
      }
    });

    this.videoPlayer.addEventListener('click', () => {
      if (this.videoPlayer.paused) {
        this.videoPlayer.play();
        this.bigPlayButton.style.visibility = 'visible';
        this.videoPlayer.classList.add('video--playing');
      } else {
        this.videoPlayer.pause();
        this.bigPlayButton.style.visibility = 'visible';
        this.videoPlayer.classList.remove('video--playing');
      }
    });
  }
}
