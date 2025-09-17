window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const text = "Website Developer";
  const speed = 150; // typing speed
  const erase = 80;  // backspace speed
  const delay = 2000; // wait before erasing

  let index = 0;
  let isDeleting = false;
  const typedText = document.getElementById("typed-text");

  function type() {
    if (isDeleting) {
      typedText.textContent = text.substring(0, index--);
    } else {
      typedText.textContent = text.substring(0, index++);
    }

    if (!isDeleting && index === text.length) {
      setTimeout(() => isDeleting = true, delay);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
    }

    setTimeout(type, isDeleting ? erase : speed);
  }

document.addEventListener("DOMContentLoaded", () => {
  type();
});