const featuredItems = document.getElementById("featured-items");
const trendingItems = document.getElementById("trending-items");

const sampleProducts = [
  {
    name: "Gas Mask Bear",
    img: "assets/images/products/thermometer.png",
    views: "1.8k",
    timestamp: "22-18-23"
  },
  {
    name: "Blue Punk",
    img: "assets/images/products/ecg.png",
    views: "1.2k",
    timestamp: "22-18-23"
  },
    {
    name: "Gas Mask Bear",
    img: "assets/images/products/thermometer.png",
    views: "1.8k",
    timestamp: "22-18-23"
  },
  {
    name: "Blue Punk",
    img: "assets/images/products/ecg.png",
    views: "1.2k",
    timestamp: "22-18-23"
  }
];

function renderCards(container, items) {
  container.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${item.name}" />
      <div class="card-body">
        <p>${item.name}</p>
        <button>Place a bid</button>
      </div>
    </div>
  `).join('');
}

renderCards(featuredItems, sampleProducts);
renderCards(trendingItems, [sampleProducts[1]]);

// Optional: handle tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const featuredSwiper = new Swiper('.featured-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});


