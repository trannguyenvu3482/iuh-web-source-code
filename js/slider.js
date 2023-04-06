let sliderPrevBtn = document.querySelector('.main-slider-prev-btn');
let sliderNextBtn = document.querySelector('.main-slider-next-btn');

let slider = document.querySelector('.main-slider');
let sliderItems = document.querySelectorAll('.main-slider__item');

let currentSlide = 0;
let maxSlide = sliderItems.length;

// Set the first slide to active
sliderItems[0].classList.add('active');

// Write a function to move to the next slide
const goToSlide = () => {
  // Change the active class
  document
    .querySelector('.main-slider__item.active')
    .classList.remove('active');

  currentSlide++;

  if (currentSlide > maxSlide - 1) {
    currentSlide = 0;
  }

  sliderItems[currentSlide].classList.add('active');
};

// Write a function to move to the previous slide
const goToPrevSlide = () => {
  // Change the active class
  document
    .querySelector('.main-slider__item.active')
    .classList.remove('active');

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = maxSlide - 1;
  }

  sliderItems[currentSlide].classList.add('active');
};

// Action listeners
sliderNextBtn.addEventListener('click', goToSlide);
sliderPrevBtn.addEventListener('click', goToPrevSlide);

// Run the function every 3 seconds
setInterval(goToSlide, 3000);
