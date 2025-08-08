const featuredItems = document.getElementById("featured-items");
const trendingItems = document.getElementById("trending-items");

const sampleProducts = [
  {
    id: 1,
    name: "THOXTRIM-480",
    img: "assets/images/products/BOX-THOXTRIM-480.png"
  },
  {
    id: 2,
    name: "ILAMINE-4",
    img: "assets/images/products/ILAMINE-4.png"
  },
  {
    id: 3,
    name: "Toxic Panda",
    img: "assets/images/products/panda.png"
  },
  {
    id: 4,
    name: "Red Lizard",
    img: "assets/images/products/lizard.png"
  },
  {
    id: 5,
    name: "Green Bot",
    img: "assets/images/products/robot.png"
  }
];

function renderCards(container, items) {
  container.innerHTML = items.map(item => `
    <div class="card">
      <a href="pages/detail.html?id=${item.id}">
       <img src="${item.img}" alt="${item.name}" />
      </a>
      <div class="card-body">
        <a href="pages/detail.html?id=${item.id}" class="card-name">
          <p>${item.name}</p>
        </a>
        <button onclick="location.href='pages/detail.html?id=${item.id}'">Read More</button>
      </div>
    </div>
  `).join('');
}


// Render product cards into the containers
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

setInterval(autoScrollFeatured, 30);

