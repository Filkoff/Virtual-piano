const keys = document.querySelectorAll(".piano-key");
const buttonsContainer = document.querySelector(".btn-container");
const buttons = document.querySelectorAll(".btn");
const fullscreen = document.querySelector(".fullscreen");
const piano = document.querySelector(".piano");

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
});

buttonsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-active")) {
    buttons.forEach((button) => button.classList.toggle("btn-active"));
    keys.forEach((key) => key.classList.toggle("display"));
  }
});

const play = (e) => {
  e.target.classList.add("piano-key-active");
  if (!e.target.getAttribute("data-note")) return;
  const audio = new Audio(
    `assets/audio/${e.target.getAttribute("data-note")}.mp3`
  );
  audio.play();
};
const stop = (e) => {
  e.target.classList.remove("piano-key-active");
};

const mouseOver = (e) => {
  if (e.target.classList.contains("piano-key")) {
    keys.forEach((key) => {
      key.addEventListener("mouseover", play);
      key.addEventListener("mouseout", stop);
    });
  }
};

const mouseOut = (e) => {
  keys.forEach((key) => {
    key.classList.remove("piano-key-active");
    key.removeEventListener("mouseover", play);
    key.removeEventListener("mouseout", stop);
  });
};

piano.addEventListener("mousedown", play);
piano.addEventListener("mousedown", mouseOver);
piano.addEventListener("mouseup", mouseOut);

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const audio = document.getElementById(`${e.code}`);
  if (!audio) return;
  const key = document.querySelector(
    `.piano-key[data-letter="${e.code.slice(-1)}"]`
  );
  audio.currentTime = 0;
  audio.play();
  key.classList.add("piano-key-active");
});

window.addEventListener("keyup", (e) => {
  const key = document.querySelector(
    `.piano-key[data-letter="${e.code.slice(-1)}"]`
  );
  if (!key) return;
  key.classList.remove("piano-key-active");
});
