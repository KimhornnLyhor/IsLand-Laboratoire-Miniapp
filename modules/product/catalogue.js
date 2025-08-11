const productGrid = document.getElementById('productGrid');
const pagination = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

const baseDataPath = '../data/products/';
const baseImagePath = '../assets/images/products/';

let allProducts = [];
const productsPerPage = 10;
let currentPage = 1;
let totalPages = 1;

// Helper to create category pill with color classes
function createCategoryPill(category) {
  const span = document.createElement('span');
  span.textContent = category;
  span.className = `category-pill category-${category.toLowerCase()}`;
  return span;
}

// Create product card with category pill and details button
function createProductCard(prod) {
  const card = document.createElement('div');
  card.className = 'product-card p-4 bg-white rounded-xl shadow flex items-center space-x-4 hover:shadow-md transition-shadow';

  const img = document.createElement('img');
  img.src = baseImagePath + prod.image;
  img.alt = prod.name;
  img.className = 'w-16 h-16 object-contain rounded';

  const info = document.createElement('div');
  info.className = 'flex-1';

  const name = document.createElement('h3');
  name.textContent = prod.name;
  name.className = 'font-semibold text-lg text-gray-900';

  const desc = document.createElement('p');
  desc.textContent = prod.description;
  desc.className = 'text-gray-600 text-sm mt-1';

  const footer = document.createElement('div');
  footer.className = 'flex justify-between items-center mt-3';

  const categoryPill = createCategoryPill(prod.category);

  const detailsBtn = document.createElement('button');
  detailsBtn.textContent = 'View Details';
  detailsBtn.className = 'text-sm text-gray-500 hover:text-gray-700 cursor-pointer';

  footer.appendChild(categoryPill);
  footer.appendChild(detailsBtn);

  info.appendChild(name);
  info.appendChild(desc);
  info.appendChild(footer);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

// Load products JSON
async function loadProducts() {
  try {
    const response = await fetch(baseDataPath + 'all.json');
    if (!response.ok) throw new Error('Failed to fetch products JSON');
    allProducts = await response.json();
    totalPages = Math.ceil(allProducts.length / productsPerPage);
    renderPagination();
    displayProducts(currentPage);
  } catch (error) {
    productGrid.innerHTML = `<p class="text-red-600">${error.message}</p>`;
    console.error(error);
  }
}

// Render products for current page
function displayProducts(page) {
  productGrid.innerHTML = '';
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = allProducts.slice(start, end);

  if (productsToShow.length === 0) {
    productGrid.innerHTML = '<p>No products found.</p>';
    return;
  }

  productsToShow.forEach(prod => {
    const card = createProductCard(prod);
    productGrid.appendChild(card);
  });

  updatePaginationButtons();
}

// Render page number buttons dynamically
function renderPagination() {
  // Remove existing numbered buttons first
  const existingPageButtons = pagination.querySelectorAll('button.page-btn');
  existingPageButtons.forEach(btn => btn.remove());

  // Insert page buttons between prev and next
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn px-3 py-1 border rounded';
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('bg-blue-600', 'text-white');
    btn.addEventListener('click', () => {
      currentPage = i;
      displayProducts(currentPage);
    });
    pagination.insertBefore(btn, nextPageBtn);
  }
}

// Update prev/next button disabled states & highlight current page
function updatePaginationButtons() {
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  const pageButtons = pagination.querySelectorAll('button.page-btn');
  pageButtons.forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white');
    if (parseInt(btn.textContent) === currentPage) {
      btn.classList.add('bg-blue-600', 'text-white');
    }
  });
}

// Event Listeners
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentPage);
  }
});

nextPageBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentPage);
  }
});

// Initialize
loadProducts();
