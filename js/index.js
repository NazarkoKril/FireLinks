"use strick";
// faq list
document.addEventListener("DOMContentLoaded", function () {
  let faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(function (faqItem) {
    faqItem.addEventListener("click", toggleAnswer);
  });

  function toggleAnswer(event) {
    let clickedItem = event.currentTarget;

    faqItems.forEach(function (item) {
      if (item !== clickedItem && item.classList.contains("open")) {
        item.classList.remove("open");
        let answer = item.querySelector(".faq__answer");
        answer.style.animation = "fadeOutUp 0.5s ease-out";
        setTimeout(function () {
          answer.style.display = "none";
        }, 500);
      }
    });

    clickedItem.classList.toggle("open");
    let answer = clickedItem.querySelector(".faq__answer");
    if (clickedItem.classList.contains("open")) {
      answer.style.display = "block";
      answer.style.animation = "fadeInDown 0.5s ease-out";
    } else {
      answer.style.animation = "fadeOutUp 0.5s ease-out";
      setTimeout(function () {
        answer.style.display = "none";
      }, 500);
    }
  }
});

// swiper  reviews

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  speed: 900,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    1245: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

// swiper  gallery
let swiper1 = new Swiper(".mySwiper1", {
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  speed: 900,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 40,
    },

    1240: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

document.querySelectorAll(".swiper__slide").forEach((slide, index) => {
  slide.addEventListener("click", () => openLightbox(slide));
});

function openLightbox(clickedSlide) {
  const clickedImgSrc = clickedSlide.querySelector("img").src;
  lightboxImg.src = clickedImgSrc;
  lightbox.style.display = "block";
}

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// form
document.addEventListener("DOMContentLoaded", function () {
  var submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (event) {
      validateForm(event);
    });
  }
});
function validateForm(event) {
  let nameInput = document.getElementById("name");
  let phoneInput = document.getElementById("phone");
  let emailInput = document.getElementById("email");
  let tariffInputs = document.querySelectorAll('input[name="tariff"]');
  let agreementCheckbox = document.getElementById("agreement");

  removeValidationStyles();

  if (nameInput.value.trim() === "") {
    alert("Please enter your name");
    nameInput.classList.add("invalid-input", "invalid-input-shake");
    event.preventDefault();
    return;
  }

  let phoneRegex = /^\+48-\d{3}-\d{3}-\d{3}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    alert("Please enter a valid Polish phone number (+48-000-000-000)");
    phoneInput.classList.add("invalid-input", "invalid-input-shake");
    event.preventDefault();
    return;
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    alert("Please enter a valid email address");
    emailInput.classList.add("invalid-input", "invalid-input-shake");
    event.preventDefault();
    return;
  }

  let isTariffSelected = Array.from(tariffInputs).some(
    (input) => input.checked
  );
  if (!isTariffSelected) {
    alert("Please select a tariff");

    tariffInputs.forEach((input) =>
      input.classList.add("invalid-input", "invalid-input-shake")
    );
    event.preventDefault();
    return;
  }

  if (!agreementCheckbox.checked) {
    alert("Please agree to the processing of personal data.");
    agreementCheckbox.classList.add("invalid-input", "invalid-input-shake");
    event.preventDefault();
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Your form has been successfully submitted",
    showConfirmButton: false,
    timer: 1500,
  });
  closeForm();

  removeValidationStyles();
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  document.getElementById("message").value = "";
  document.getElementById("agreement").checked = false;
  return false;
}

function removeValidationStyles() {
  let invalidInputs = document.querySelectorAll(".invalid-input");
  invalidInputs.forEach((input) => {
    input.classList.remove("invalid-input", "invalid-input-shake");
  });
}

function openForm() {
  let formContainer = document.getElementById("myFormContainer");
  let overlay = document.getElementById("overlay");
  if (formContainer && overlay) {
    document.body.style.overflow = "hidden";
    formContainer.style.display = "block";
    overlay.style.display = "block";

    setTimeout(function () {
      overlay.style.opacity = 1;
    }, 10);

    setTimeout(function () {
      formContainer.style.opacity = 1;
    }, 10);
  }
}

function closeForm() {
  let formContainer = document.getElementById("myFormContainer");
  let overlay = document.getElementById("overlay");
  if (formContainer && overlay) {
    formContainer.style.opacity = 0;

    setTimeout(function () {
      overlay.style.opacity = 0;
    }, 300);

    setTimeout(function () {
      formContainer.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }
}

// scroll top
window.onscroll = function () {
  showScrollTopButton();
};

function showScrollTopButton() {
  let button = document.getElementById("scrollToTopBtn");
  let usefulSection = document.getElementById("useful");

  let isInUsefulSection = window.scrollY >= usefulSection.offsetTop;

  if (isInUsefulSection) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// burger-header
let menuBtn1 = document.querySelector(".menu-btn1");
let menu1 = document.querySelector(".menu1");
let body1 = document.body;

let anchorLinks1 = document.querySelectorAll(".menu__items1 a");

anchorLinks1.forEach(function (anchor) {
  anchor.addEventListener("click", function () {
    menuBtn1.classList.remove("active");
    menu1.classList.remove("active");
    body1.style.overflow = "auto";
    let targetId = this.getAttribute("href").substring(1);
    let targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

menuBtn1.addEventListener("click", function () {
  menuBtn1.classList.toggle("active");
  menu1.classList.toggle("active");

  if (menu1.classList.contains("active")) {
    body1.style.overflow = "hidden";
  } else {
    body1.style.overflow = "auto";
  }
});
