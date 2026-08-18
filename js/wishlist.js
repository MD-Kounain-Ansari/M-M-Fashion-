/* =========================================
   M&M FASHION
   WISHLIST PAGE
========================================= */

const wishlistGrid = document.getElementById("wishlistGrid");

const wishlistEmptyState = document.getElementById("wishlistEmptyState");

const wishlistCountLabel = document.getElementById("wishlistCountLabel");

const clearWishlistBtn = document.getElementById("clearWishlistBtn");

/* =========================================
   GET WISHLIST
========================================= */

function getWishlist() {
  return JSON.parse(localStorage.getItem("mmWishlist") || "[]").map(String);
}

/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist(items) {
  localStorage.setItem("mmWishlist", JSON.stringify(items));
}

/* =========================================
   FORMAT PRICE
========================================= */

function formatWishlistPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

/* =========================================
   CLEAR WISHLIST
========================================= */

clearWishlistBtn?.addEventListener("click", () => {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    return;
  }

  const confirmed = confirm("Are you sure you want to clear your wishlist?");

  if (!confirmed) {
    return;
  }

  localStorage.removeItem("mmWishlist");

  renderWishlist();

  showWishlistPageToast("Wishlist cleared");
});

/* =========================================
   RENDER WISHLIST
========================================= */
function renderWishlist() {
  if (!wishlistGrid) {
    return;
  }

  const wishlist = getWishlist();

  wishlistGrid.innerHTML = "";

  /* Update count */

  if (wishlistCountLabel) {
    wishlistCountLabel.textContent = `${wishlist.length} ${
      wishlist.length === 1 ? "item" : "items"
    }`;
  }

  /* Empty state */

  if (wishlist.length === 0) {
    wishlistEmptyState?.classList.add("is-visible");

    wishlistGrid.style.display = "none";

    return;
  }

  wishlistEmptyState?.classList.remove("is-visible");

  wishlistGrid.style.display = "grid";

  /* Check product data */

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error("Product data is not loaded. Check products.js.");

    return;
  }

  wishlist.forEach((id) => {
    const product = products.find((item) => String(item.id) === String(id));

    /* Ignore invalid saved IDs */

    if (!product) {
      console.warn(`Wishlist product ${id} was not found in products.js`);

      return;
    }

    const card = document.createElement("article");

    card.className = "wishlist-product-card";

    const oldPriceHTML = product.oldPrice
      ? `
                    <span class="wishlist-old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>
                `
      : "";

    const badgeHTML = product.badge
      ? `
                    <span class="wishlist-product-badge ${
                      product.badge === "SALE" ? "sale" : ""
                    }">
                        ${product.badge}
                    </span>
                `
      : "";

    card.innerHTML = `

            <div class="wishlist-image-wrapper">

                <a
                    href="product.html?id=${product.id}"
                    class="wishlist-image-link"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="wishlist-product-image"
                        loading="lazy"
                    >

                </a>

                ${badgeHTML}

                <button
                    type="button"
                    class="wishlist-remove-btn"
                    data-product-id="${product.id}"
                    aria-label="Remove ${product.name} from wishlist"
                >
                    ♥
                </button>

            </div>


            <div class="wishlist-product-info">

                <p class="wishlist-product-category">
                    ${product.category}
                </p>

                <h2 class="wishlist-product-name">
                    ${product.name}
                </h2>

                <div class="wishlist-product-price">

                    <span>
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    ${oldPriceHTML}

                </div>


                <button
                    type="button"
                    class="wishlist-add-cart-btn"
                    data-product-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        `;

    wishlistGrid.appendChild(card);
  });
}

/* =========================================
   REMOVE WISHLIST ITEM
========================================= */

wishlistGrid?.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".wishlist-remove-btn");

  if (!removeButton) {
    return;
  }

  const productId = String(removeButton.dataset.productId);

  const updatedWishlist = getWishlist().filter((id) => id !== productId);

  saveWishlist(updatedWishlist);

  renderWishlist();

  showWishlistPageToast("Removed from wishlist");
});

/* =========================================
   ADD WISHLIST ITEM TO CART
========================================= */

wishlistGrid?.addEventListener("click", (event) => {
  const addButton = event.target.closest(".wishlist-add-cart-btn");

  if (!addButton) {
    return;
  }

  const productId = Number(addButton.dataset.productId);

  /*
           Reuse the global cart function
           from main.js.
        */

  if (typeof addToCart === "function") {
    addToCart(productId);
  }
});

/* =========================================
   TOAST
========================================= */

function showWishlistPageToast(message) {
  let toast = document.getElementById("wishlistPageToast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "wishlistPageToast";

    toast.className = "wishlist-page-toast";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* =========================================
   INITIALIZE
========================================= */

renderWishlist();
