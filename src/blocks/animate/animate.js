/* eslint-disable quotes */


function isVisible(elem) {
  const coords = elem.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;

  const topVisible = coords.top > 50 && coords.top < windowHeight;
  const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

function showVisible() {
  const animated = document.querySelectorAll(".animate");
  animated.forEach((item) => {
    if (isVisible(item)) {
      if (!item.classList.contains("animate--in-view")) {
        item.classList.add("animate--in-view");
      }
    }
  });
}

window.addEventListener("scroll", showVisible);
showVisible();
