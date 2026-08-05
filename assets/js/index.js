const savedFont = localStorage.getItem("font") || "tajawal";
document.body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
document.body.classList.add(`font-${savedFont}`);
activeButton();
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "#6366f1");
  activetheme();
} else {
  activetheme();
}
const html = document.documentElement;
if (!localStorage.getItem("mode")) {
  localStorage.setItem("mode", "dark");
  changeMode();
} else {
  changeMode();
}
function localhostStringfy() {
  localStorage.setItem("settings", JSON.stringify(settings));
}
function showsidebar() {
  document.getElementById("settings-sidebar").classList.add("translate-ratio");

  document.getElementById("settings-toggle").style.transform =
    "translate(-320px,-50%)";
}
function hideSideBar() {
  document
    .getElementById("settings-sidebar")
    .classList.remove("translate-ratio");

  document.getElementById("settings-toggle").style.transform =
    "translateY(-50%)";
}
document
  .getElementById("settings-toggle")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    showsidebar();
  });
document
  .getElementById("close-settings")
  .addEventListener("click", hideSideBar);
document.body.addEventListener("click", hideSideBar);
const buttns = [];
function activeButton() {
  console.log(localStorage.getItem("font"));
  const activebtn = document.querySelector(
    `[data-font="${localStorage.getItem("font")}"]`,
  );
  activebtn.classList.add(
    "active",
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800",
  );
  activebtn.classList.remove("border-slate-200", "dark:border-slate-700");
  return activebtn;
}
let lastactive;
lastactiveSet();
function lastactiveSet() {
  lastactive = document.querySelector(
    `[data-font="${localStorage.getItem("font")}"]`,
  );
}
function lastactiveAdd() {
  lastactive.classList.add("border-slate-200", "dark:border-slate-700");
}
document.querySelectorAll(".font-option").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    document.body.classList.remove(
      "font-tajawal",
      "font-cairo",
      "font-alexandria",
    );
    console.log(lastactive);
    lastactiveRemove();
    lastactiveAdd();
    document.body.classList.add(`font-${this.dataset.font}`);
    localStorage.setItem("font", this.dataset.font);
    lastactiveSet();
    activeButton();
    e.stopPropagation();
  });
});
function activetheme() {
  const activetheme = document.querySelector(
    `[data-primary="${localStorage.getItem("theme")}"]`,
  );
  activetheme.classList.add(
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
    "ring-2",
  );
  document.documentElement.style.setProperty(
    "--color-primary",
    activetheme.dataset.primary,
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    activetheme.dataset.secondary,
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    activetheme.dataset.accent,
  );
}
let lasttheme;
lastthemeSet();
function lastthemeSet() {
  lasttheme = document.querySelector(
    `[data-primary="${localStorage.getItem("theme")}"]`,
  );
}
function lastthemeRemove() {
  lasttheme.classList.remove(
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
    "ring-2",
  );
}
function lastactiveRemove() {
  lastactive.classList.remove(
    "active",
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800",
  );
}

document.querySelectorAll(".theme-buttons").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    lastthemeRemove();
    localStorage.setItem("theme", this.dataset.primary);
    lastthemeSet();
    activetheme();
    e.stopPropagation();
  });
});
document.getElementById("reset-settings").onclick = function () {
  lastthemeRemove();
  lastactiveRemove();
  lastactiveAdd();
  localStorage.setItem("font", "tajawal");
  lastactiveSet();
  localStorage.setItem("theme", "#6366f1");
  lastthemeSet();
  activeButton();
  activetheme();
};

function changeMode() {
  if (localStorage.getItem("mode") == "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
    console.log("ren");
  }
}
document
  .getElementById("theme-toggle-button")
  .addEventListener("click", function () {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 80) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => link.classList.remove("active"));

  document
    .querySelector(`.nav-link[href="#${currentSection.id}"]`)
    ?.classList.add("active");
});
function matchItem(btn) {
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    if (item.dataset.category === btn.dataset.filter) {
      item.classList.add("block");
      item.classList.remove("hidden");
      console.log(item);
    } else {
      item.classList.remove("block");
      item.classList.add("hidden");
    }
  });
}
function btnActiveRemove(btn) {
  btn.classList.remove(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50",
  );
}

let lastActiveFilter = document.querySelector(".portfolio-filter.active");
document.querySelectorAll(".portfolio-filter").forEach((btn) => {
  if (btn.dataset.filter !== "all") {
    btnActiveRemove(btn);
  }

  btn.onclick = function () {
    btnActiveRemove(lastActiveFilter);
    lastActiveFilter.classList.add(
      "bg-white",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
      "dark:bg-slate-800",
      "text-slate-600",
    );
    lastActiveFilter = btn;

    btn.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );
    btn.classList.remove(
      "bg-white",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
      "dark:bg-slate-800",
      "text-slate-600",
    );
    if (btn.dataset.filter === "all") {
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.classList.remove("hidden");
        item.classList.add("block");
      });
    } else {
      matchItem(btn);
    }
  };
});
let counterofleftSlider = 0;
let counterRight = 0;
function moveSlider() {
  document.getElementById("testimonials-carousel").style.transform =
    `translateX(-${counterofleftSlider * 33.3333}%)`;

  slideIndicator(counterofleftSlider.toString());
}
function slideIndicator(indx) {
  document.querySelectorAll(".carousel-indicator").forEach((btn) => {
    if (btn.dataset.index == indx) {
      btn.classList.remove("bg-slate-400", "dark:bg-slate-600");
      btn.classList.add("active", "bg-accent", "scale-125");
    } else {
      btn.classList.add("bg-slate-400", "dark:bg-slate-600");
      btn.classList.remove("active", "bg-accent", "scale-125");
    }
  });
}
function movingSlider() {
  if (counterofleftSlider === 0) {
    slideIndicator("0");
    document.getElementById("testimonials-carousel").style.transform =
      "translateX(0%)";
  } else if (counterofleftSlider === 1) {
    slideIndicator("1");
    document.getElementById("testimonials-carousel").style.transform =
      "translateX(33.3333%)";
  } else if (counterofleftSlider === 2) {
    slideIndicator("2");
    document.getElementById("testimonials-carousel").style.transform =
      "translateX(66.6666%)";
  } else if (counterofleftSlider === 3) {
    slideIndicator("3");
    document.getElementById("testimonials-carousel").style.transform =
      "translateX(100%)";
  }
}
document
  .getElementById("next-testimonial")
  .addEventListener("click", function () {
    counterofleftSlider++;

    if (counterofleftSlider > 3) {
      testimonials.style.transform = "translateX(0%)";
      counterofleftSlider = 0;
    }

    movingSlider();
  });
document
  .getElementById("prev-testimonial")
  .addEventListener("click", function () {
    counterofleftSlider--;

    if (counterofleftSlider < 0) {
      counterofleftSlider = 3;
      testimonials.style.transform = "translateX(0%)";
    }

    movingSlider();
  });
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validateInput(document.getElementById("full-name")) &&
    validateInput(document.getElementById("email")) &&
    validateInput(document.getElementById("phone")) &&
    validateInput(document.getElementById("project-details"))
  ) {
    Swal.fire({
      title: "تم ارسال رسالتك بنجاح",
      text: "شكرا لتواصلك سأرد عليك في اقرب وقت ممكن",
      icon: "success",
      confirmButtonText: "حسنا",
      showConfirmButton: true,
      background: "#233045",
      color: "#fff",
      width: "400px",
      heigh: "200px",
    });
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("project-details").value = "";
  } else {
    if (validateInput(document.getElementById("full-name")) == false) {
      document.getElementById("full-name").nextElementSibling.style.display =
        "block";
    }
    if (validateInput(document.getElementById("email")) == false) {
      document.getElementById("email").nextElementSibling.style.display =
        "block";
    }
    if (validateInput(document.getElementById("phone")) == false) {
      document.getElementById("phone").nextElementSibling.style.display =
        "block";
    }
    if (validateInput(document.getElementById("project-details")) == false) {
      document.getElementById(
        "project-details",
      ).nextElementSibling.style.display = "block";
    }
  }
});
var isValid;
var regex = {
  "full-name": /^.{1,50}$/,
  phone: /^$|^((\+20|0020|0)?1[0125][0-9]{8})$/,
  email: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/,
  "project-details": /^.{10,1000}$/,
};
function validateInput(element) {
  isValid = regex[element.id].test(element.value);
  if (isValid) {
    element.nextElementSibling.style.display = "none";
  } else {
    element.nextElementSibling.style.display = "block";
  }
  return isValid;
}
document.querySelectorAll(".vlaidate-input").forEach((element) => {
  element.addEventListener("input", function () {
    validateInput(element);
  });
});
const btn2 = document.getElementById("scroll-to-top");
const firstSection = document.getElementById("hero-section");

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      btn2.classList.add("opacity-0", "invisible");
      btn2.classList.remove("opacity-100", "visible");
    } else {
      btn2.classList.add("opacity-100", "visible");
      btn2.classList.remove("opacity-0", "invisible");
    }
  },
  {
    threshold: 0,
  },
);
observer.observe(firstSection);
btn2.addEventListener("click", function () {
  firstSection.scrollIntoView({ behavior: "smooth" });
});
