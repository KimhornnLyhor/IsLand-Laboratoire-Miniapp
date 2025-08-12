const featuredItems = document.getElementById("featured-items");
const trendingItems = document.getElementById("trending-items");
const searchInput = document.getElementById("searchInput");

const sampleProducts = [
  {
    id: 1,
    name: "THOXTRIM-480",
    img: "assets/images/products/BOX-THOXTRIM-480.png",
    shortDescription: "Accurate temperature measurement"
    // shortdescription: "THOXTRIM-480 is a broad-spectrum antibiotic used to treat various bacterial infections. It contains a combination of trimethoprim and sulfamethoxazole, which work together to inhibit bacterial growth. This medication is effective against respiratory, urinary, and gastrointestinal infections.",
    // longdescription: "THOXTRIM-480 is a broad-spectrum antibiotic that combines trim
  },
  {
    id: 2,
    name: "ILAMINE-4",
    img: "assets/images/products/ILAMINE-4.png",
    shortDescription: "Accurate temperature measurement"

  },
  {
    id: 3,
    name: "RHINOMINE-300",
    img: "assets/images/products/RHINOMINE-300.png",
    shortDescription: "Accurate temperature measurement"
  }
  ];
//   {
//     id: 4,
//     name: "THOXTRIM-960",
//     img: "assets/images/products/BOX-THOXTRIM-960.png",
//     shortDescription: "Accurate temperature measurement"
//   },
//   {
//     id: 5,
//     name: "ILAVIC-TAB",
//     img: "assets/images/products/ILAVIC-TAB.png",
//     shortDescription: "Accurate temperature measurement"
//   }
// ];

function renderCards(container, items) {
  container.innerHTML = items.map(item => `
    <div class="card product-card">
      <a href="pages/detail.html?id=${item.id}">
        <img src="${item.img}" alt="${item.name}" />
      </a>
      <div class="card-body">
        <a href="pages/detail.html?id=${item.id}" class="card-name">
          <h3 class="product-name">${item.name}</h3>
          <p class="product-description">${item.shortDescription}</p>
        </a>
        <button onclick="location.href='pages/detail.html?id=${item.id}'">Read More</button>
      </div>
    </div>
  `).join('');
}

// Initial render
renderCards(featuredItems, sampleProducts);
renderCards(trendingItems, [sampleProducts[1]]);

// Search filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderCards(featuredItems, filteredProducts);
});
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderCards(featuredItems, filteredProducts);
  renderCards(trendingItems, filteredProducts);
});

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
document.querySelectorAll('button[data-link]').forEach(button => {
  button.addEventListener('click', () => {
    const url = button.getAttribute('data-link');
    window.location.href = url;
  });
});

// catalogue.html
const productGrid = document.getElementById('productGrid');
const categoryButtons = document.querySelectorAll('#categoryFilters button');
const pagination = document.getElementById('pagination');

let products = [];
let currentPage = 1;
const itemsPerPage = 10;
let currentFilter = "all";

async function loadProducts() {
  try {
    const res = await fetch('products.json');
    products = await res.json();
    renderProducts();
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderProducts(filter = currentFilter, page = currentPage) {
  currentFilter = filter;
  currentPage = page;

  const filtered = products.filter(p => filter === "all" || p.category === filter);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filtered.slice(start, end);

  // Render products
  productGrid.innerHTML = "";
  paginatedItems.forEach(p => {
    productGrid.innerHTML += `
      <div class="product-card bg-white rounded-xl shadow-sm">
        <div class="flex">
          <div class="w-20 h-20 bg-gray-50 flex items-center justify-center">
            <img src="${p.image}" alt="${p.name}" class="w-12 h-12">
          </div>
          <div class="flex-1 p-4">
            <h4 class="font-semibold text-gray-900">${p.name}</h4>
            <p class="text-sm text-gray-500 mt-1">${p.desc}</p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full capitalize">${p.category}</span>
              <button class="text-sm text-blue-500">View Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return;

  if (currentPage > 1) {
    pagination.appendChild(createPageButton("Prev", currentPage - 1));
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = createPageButton(i, i);
    if (i === currentPage) {
      btn.classList.add("bg-blue-500", "text-white");
    } else {
      btn.classList.add("bg-gray-200", "text-gray-700");
    }
    pagination.appendChild(btn);
  }

  if (currentPage < totalPages) {
    pagination.appendChild(createPageButton("Next", currentPage + 1));
  }
}

function createPageButton(text, page) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = "px-3 py-1 rounded hover:bg-gray-300 transition";
  btn.addEventListener("click", () => renderProducts(currentFilter, page));
  return btn;
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category, 1);
  });
});

document.getElementById('searchBtn').addEventListener('click', () => {
  alert("Search feature coming soon!");
});

loadProducts();
// Render product cards into the containers
