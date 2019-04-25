/* eslint-disable quotes */
const header = document.querySelector(".page-header");
const menuButton = header.querySelector(".page-header__toggle");
const headerBottom = header.getBoundingClientRect().bottom + pageXOffset;

function toggle() {
  header.classList.toggle("menu-open");
}

menuButton.onclick = toggle;

window.onscroll = function () {
  if (header.classList.contains('fixed') && window.pageYOffset < headerBottom) {
    header.classList.remove('fixed');
  } else if (window.pageYOffset > headerBottom) {
    header.classList.add('fixed');
  }
};
