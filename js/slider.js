const sliderPrevBtn = document.querySelector('.main-slider-prev-btn');
const sliderNextBtn = document.querySelector('.main-slider-next-btn');

const slider = document.querySelector('.main-slider');
const sliderItems = document.querySelectorAll('.main-slider__item');

const sliderDots = document.querySelectorAll('.main-slider__dot');

let currentSlide = 0;
let maxSlide = sliderItems.length;

// Set the first slide to active
sliderItems[0].classList.add('active');
sliderDots[0].classList.add('active');

const changeDot = (dotNumber) => {
  // Change active dot
  document.querySelector('.main-slider__dot.active').classList.remove('active');
  sliderDots[dotNumber].classList.add('active');
};

// Write a function to move to the next slide
const goToNextSlide = () => {
  // Change the active class
  document
    .querySelector('.main-slider__item.active')
    .classList.remove('active');

  currentSlide++;

  if (currentSlide > maxSlide - 1) {
    currentSlide = 0;
  }

  sliderItems[currentSlide].classList.add('active');

  // Change active dot
  changeDot(currentSlide);
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

  // Change active dot
  changeDot(currentSlide);
};

// Action listeners
sliderNextBtn.addEventListener('click', goToNextSlide);
sliderPrevBtn.addEventListener('click', goToPrevSlide);
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // Change the active class
    document
      .querySelector('.main-slider__item.active')
      .classList.remove('active');

    currentSlide = index;

    sliderItems[currentSlide].classList.add('active');

    changeDot(index);
  });
});

// Run the function every 3 seconds
setInterval(() => {
  goToNextSlide();
}, 3000);
