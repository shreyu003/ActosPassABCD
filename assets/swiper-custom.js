var artistSwiper = new Swiper(".artistSwiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    375: {
      slidesPerView: 2,
    },
    425: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1370: {
      slidesPerView:5,
    },
    1440: {
      slidesPerView:5,
    },
  },
});
var productMediaSwiper = new Swiper(".productMediaSwiper", {  
  navigation: {
    nextEl: ".swiper-button-next.prdMediaNext",
    prevEl: ".swiper-button-prev.prdMediaPrev",
  },
});

