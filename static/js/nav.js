const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const banner = document.querySelector(".banner");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    primaryNav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

for (let btn of dropdownBtns) {
  btn.addEventListener("click", (e) => {
    let dropdown = btn.nextElementSibling;

    // measure the height of sub-menu by cloning it and setting maxHeight to
    // something very big.
    const dpClone = dropdown.cloneNode(true);
    dpClone.style.opacity = 0;
    dpClone.style.maxHeight = '9999px';
    dropdown.parentElement.appendChild(dpClone);
    const height = dpClone.getBoundingClientRect().height + 'px';
    dpClone.remove();

    if (dropdown.style.maxHeight == '') {
      dropdown.style.maxHeight = height;
      btn.setAttribute("aria-expanded", "true");
    } else {
      dropdown.style.maxHeight = '';
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

window.onclick = function(e) {
  if (primaryNav.getAttribute("data-visible") == "false") {
    if (!e.target.matches('.dropdown-btn, .dropdown-triangle')) {
      for (let dropdown of dropdowns) {
        if (dropdown.style.maxHeight != '') {
          dropdown.style.maxHeight = '';
        }
      }

      for (let btn of dropdownBtns) {
        if (btn.getAttribute("aria-expanded") == "true") {
          btn.setAttribute("aria-expanded", "false");
        }
      }
    }
  }

  if (e.target.matches('.dropdown-btn, .dropdown-triangle')) {
    const btn = e.target.classList.contains('dropdown-btn') ? 
                e.target : e.target.parentElement;
    for (let btnItem of dropdownBtns) {
      if (btn != btnItem) {
        if (btnItem.getAttribute("aria-expanded") == "true") {
          console.log("other menu is open");
          btnItem.setAttribute("aria-expanded", "false");
          const dropdown = btnItem.nextElementSibling;
          dropdown.style.maxHeight = '';
        }
      }
    }
  }
}

// https://css-tricks.com/stop-animations-during-window-resizing/
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
