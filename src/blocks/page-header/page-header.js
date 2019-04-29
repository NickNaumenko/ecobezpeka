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
