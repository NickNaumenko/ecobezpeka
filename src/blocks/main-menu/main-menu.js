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
