document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Tie-Dye Lounge Set",
      price: 150,
      image: "assets/image1.jpg",
    },
    {
      id: 2,
      name: "Sunburst Tracksuit",
      price: 150,
      image: "assets/image-2.jpg",
    },
    {
      id: 3,
      name: "Retro Red Streetwear",
      price: 150,
      image: "assets/image-3.jpg",
    },
    {
      id: 4,
      name: "Urban Sportswear Combo",
      price: 150,
      image: "assets/image-4.jpg",
    },
    {
      id: 5,
      name: "Oversizes Knit Coat",
      price: 150,
      image: "assets/image-5.jpg",
    },
    {
      id: 6,
      name: "Chic Monochrome Blazzer",
      price: 150,
      image: "assets/image-6.jpg",
    },
    {
      id: 7,
      name: "Chic Monochrome Blazzer",
      price: 150,
      image: "assets/image-6.jpg",
    },
  ];

  const BUNDLE_SIZE = 3;
  const DISCOUNT_PERCENTAGE = 0.3;
  let selectedProducts = [];

  const productGrid = document.getElementById("product-grid");
  const bundleList = document.getElementById("bundle-list");
  const subtotalPriceEl = document.getElementById("subtotal-price");
  const discountRow = document.getElementById("discount-row");
  const discountAmountEl = document.getElementById("discount-amount");
  const totalPriceEl = document.getElementById("total-price");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const progressBar = document.getElementById("progress-bar");
  const emptyMessage = document.getElementById("empty-bundle-message");

  
  function renderProduct() {
      productGrid.innerHTML = "";
    products.forEach((product) => {
      const isSelected = selectedProducts.some((p) => p.id === product.id);
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="card-image">
        <h3 class="card-name">${product.name}</h3>
        <p class="card-price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-add ${
            isSelected ? "added" : ""
        }" data-product-id="${product.id}">
          <span class="btn-text">${
            isSelected ? "Added to Bundle" : "Add to Bundle"
          }</span>
          <span class="plus-icon">+</span>
          <span class="check-icon">&#10003;</span>
          </button>
          `;
          productGrid.appendChild(card);
        });
    }
    
    function toggleProduct(productId) {
        const product = products.find((p) => p.id === productId);
    const index = selectedProducts.findIndex((p) => p.id === productId);
    if (index > -1) {
        selectedProducts.splice(index, 1);
    } else {
        selectedProducts.push(product);
    }
    updateUI();
}

function renderBundleList() {
    bundleList.innerHTML = "";
    if (selectedProducts.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
    selectedProducts.forEach((product) => {
        const item = document.createElement("div");
        item.className = "bundle-item";
        item.innerHTML = `
        <img src="${product.image}" alt="${
            product.name
        }" class="bundle-item-image">
        <div>
        <p class="bundle-item-name">${product.name}</p>
        <p class="bundle-item-price">$${product.price.toFixed(2)}</p>
        </div>
        <button class="btn-remove" data-product-id="${
            product.id
        }">&times;</button>
        `;
        bundleList.appendChild(item);
    });
}

function updateCartButton() {
  if (selectedProducts.length < BUNDLE_SIZE) {
    addToCartBtn.innerHTML = `
      <div class="btn-content">
        <span>Select ${BUNDLE_SIZE - selectedProducts.length} more item(s)</span>
        <img src="/assets/icons/CaretRight.svg" alt="Right arrow">
      </div>
    `;
    addToCartBtn.disabled = true;
  } else {
    addToCartBtn.innerHTML = `
      <div class="btn-content">
        <span>Add ${selectedProducts.length} items to cart</span>
        <img src="/assets/icons/CaretRight.svg" alt="Right arrow">
      </div>
    `;
    addToCartBtn.disabled = false;
  }
}


  function updatePricing() {
    const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    let discount = 0;
    if (selectedProducts.length >= BUNDLE_SIZE) {
      discount = subtotal * DISCOUNT_PERCENTAGE;
      discountRow.classList.add("visible");
    } else {
      discountRow.classList.remove("visible");
    }
    subtotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
    discountAmountEl.textContent = `-$${discount.toFixed(2)}`;
    totalPriceEl.textContent = `$${(subtotal - discount).toFixed(2)}`;
  }

  function updateProgressBar() {
    const progress = (selectedProducts.length / BUNDLE_SIZE) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  function updateUI() {
    renderProduct();
    renderBundleList();
    updatePricing();
    updateProgressBar();
    updateCartButton()
  }

  productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (btn) toggleProduct(parseInt(btn.dataset.productId));
  });

  bundleList.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-remove");
    if (btn) toggleProduct(parseInt(btn.dataset.productId));
  });

  addToCartBtn.addEventListener("click", () => {
    addToCartBtn.innerHTML = `<p>Add ${selectedProducts.length} items to cart</p>`;
    if (selectedProducts.length > 0) {
      addToCartBtn.innerHTML = `Added to Cart <span>&#10003;</span>`;
      addToCartBtn.disabled = true;
    }
  });

  updateUI();
});
