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



// Auto-scroll the featured section
const featuredGrid = document.getElementById("featured-items");

let scrollPos = 0;
let direction = 1; // 1 = right, -1 = left

function autoScrollFeatured() {
  if (!featuredGrid) return;

  scrollPos += direction * 1.2; // scroll speed

  // Reverse direction at ends
  if (scrollPos >= featuredGrid.scrollWidth - featuredGrid.clientWidth) {
    direction = -1;
  } else if (scrollPos <= 0) {
    direction = 1;
  }

  featuredGrid.scrollTo({
    left: scrollPos,
    behavior: "smooth"
  });
}

setInterval(autoScrollFeatured, 30); // scroll every 30ms

