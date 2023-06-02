// getting the elements
let player,
  video,
  progress,
  progressBar,
  toggle,
  skipButtons,
  ranges,
  fullscreenBtn;
let mousedown = false;
window.onload = function () {
  player = document.querySelector(".player");
  video = document.querySelector(".player__video");
  progress = document.querySelector(".progress");
  progressBar = document.querySelector(".progress__filled");
  toggle = document.querySelector(".player__button");
  skipButtons = document.querySelectorAll("[data-skip]");
  ranges = document.querySelectorAll(".player__slider");
  events();
  fullscreenBtn = document.querySelector(".player__button-fullscreen");
  fullscreenBtn.addEventListener("click", fullScreen);
};

// building functions
function togglePlay() {
  console.log(video);
  const method = video.paused ? "play" : "pause";
  video[method](); // similar to video.play() and video.pause()
}

function updateButton() {
  const icon = this.paused ? "►" : "I I";
  toggle.textContent = icon;
}

function skip() {
  // console.log((this.dataset.skip)+3); it's a string value
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value; // video.volume() and video.playBackRate()
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

function fullScreen() {
  video.requestFullscreen();
}

// hook up event listeners
function events() {
  video.addEventListener("click", togglePlay);
  toggle.addEventListener("click", togglePlay);

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);

  skipButtons.forEach((btn) => btn.addEventListener("click", skip));

  ranges.forEach((range) => range.addEventListener("input", handleRangeUpdate));

  video.addEventListener("timeupdate", handleProgress);

  progress.addEventListener("click", scrub);
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));
  progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
  progress.addEventListener("mouseout", (e) => (mousedown = false));
}
