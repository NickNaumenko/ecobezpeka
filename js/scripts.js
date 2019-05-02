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


/* eslint-disable curly */
/* eslint-disable quotes */
const menu = document.querySelector(".main-menu");
const mq = window.matchMedia("(min-width: 992px)");

let active = null;

function select(target) {
  if (target === active) {
    deselect();
    return;
  }

  deselect();

  show(target);
  active = target;
  target.classList.add("active");

  setTimeout(() => {
    document.addEventListener("click", deselect);
  }, 0);

}

function deselect() {
  if (!active) return;

  hide(active);
  active.classList.remove("active");
  document.removeEventListener("click", deselect);
  active = null;
}

function hide(target) {
  const parent = target.parentNode;
  const dropdown = parent.querySelector(".main-menu__dropdown");
  dropdown.style.display = "none";
}

function show(target) {
  const parent = target.parentNode;
  const dropdown = parent.querySelector(".main-menu__dropdown");
  dropdown.style.display = "inline-block";
}

function clickHandler(event) {
  const target = event.target.closest(".main-menu__dropdown-btn");

  if (!target) return;

  select(target);
}

menu.onclick = clickHandler;

mq.addListener(widthChange);
widthChange(mq);

function widthChange(mq) {
  if (mq.matches) {
    menu.onclick = null;
  }
}

/* eslint-disable quotes */
;(function () {
  const header = document.querySelector(".page-header");
  const menuButton = header.querySelector(".page-header__toggle");
  const headerBottom = header.getBoundingClientRect().bottom + pageXOffset;

  function open() {
    header.classList.add("menu-open");

    document.addEventListener("click", clickHandler);
  }

  function close() {
    header.classList.remove("menu-open");

    document.removeEventListener("click", clickHandler);
  }

  function toggle() {
    if (header.classList.contains("menu-open")) {
      close();
    } else {
      open();
    }
  }

  function clickHandler(event) {
    const target = event.target.closest(".page-header");

    if (!target) {
      close();
    }
  }

  menuButton.onclick = toggle;

  window.onscroll = function () {
    if (header.classList.contains('fixed') && window.pageYOffset < headerBottom) {
      header.classList.remove('fixed');
    } else if (window.pageYOffset > headerBottom) {
      header.classList.add('fixed');
    }
  };
}());
