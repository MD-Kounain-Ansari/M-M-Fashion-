document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
           ELEMENTS
        ====================================== */

  const cartPageItems = document.getElementById("cartPageItems");

  const cartPageCount = document.getElementById("cartPageCount");

  const cartPageSubtotal = document.getElementById("cartPageSubtotal");

  const cartPageTotal = document.getElementById("cartPageTotal");

  const cartPageContent = document.getElementById("cartPageContent");

  const cartPageEmpty = document.getElementById("cartPageEmpty");

  const clearCartPage = document.getElementById("clearCartPage");

  /* =====================================
           HELPERS
        ====================================== */

  function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
  }

  function getCart() {
    return JSON.parse(localStorage.getItem("mmCart") || "[]");
  }

  function saveCart(cart) {
    localStorage.setItem("mmCart", JSON.stringify(cart));
  }

  /* =====================================
           RENDER CART
        ====================================== */

  function renderCartPage() {
    if (!cartPageItems) {
      return;
    }

    const cart = getCart();

    cartPageItems.innerHTML = "";

    /* Empty */

    if (cart.length === 0) {
      cartPageContent?.setAttribute("hidden", "");

      cartPageEmpty?.removeAttribute("hidden");

      if (cartPageCount) {
        cartPageCount.textContent = "0 items";
      }

      if (cartPageSubtotal) {
        cartPageSubtotal.textContent = "₹0";
      }

      if (cartPageTotal) {
        cartPageTotal.textContent = "₹0";
      }

      return;
    }

    cartPageContent?.removeAttribute("hidden");

    cartPageEmpty?.setAttribute("hidden", "");

    let totalItems = 0;

    let subtotal = 0;

    cart.forEach((item) => {
      const product = window.products?.find(
        (product) => product.id === item.id,
      );

      if (!product) {
        return;
      }

      const quantity = Number(item.quantity) || 1;

      totalItems += quantity;

      subtotal += product.price * quantity;

      const cartItem = document.createElement("article");

      cartItem.className = "cart-page-item";

      cartItem.innerHTML = `

                    <a
                        href="product.html?id=${product.id}"
                        class="cart-page-item-image"
                    >
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >
                    </a>


                    <div class="cart-page-item-info">

                        <p class="cart-page-item-category">
                            ${product.category}
                        </p>

                        <h3 class="cart-page-item-name">
                            ${product.name}
                        </h3>

                        <p class="cart-page-item-price">
                            ${formatPrice(product.price)}
                        </p>


                        <button
                            type="button"
                            class="cart-page-remove"
                            data-product-id="${product.id}"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="cart-page-quantity">

                        <button
                            type="button"
                            class="cart-page-qty-btn"
                            data-action="decrease"
                            data-product-id="${product.id}"
                        >
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            class="cart-page-qty-btn"
                            data-action="increase"
                            data-product-id="${product.id}"
                        >
                            +
                        </button>

                    </div>


                    <strong class="cart-page-item-total">
                        ${formatPrice(product.price * quantity)}
                    </strong>

                `;

      cartPageItems.appendChild(cartItem);
    });

    if (cartPageCount) {
      cartPageCount.textContent = `${totalItems} ${
        totalItems === 1 ? "item" : "items"
      }`;
    }

    if (cartPageSubtotal) {
      cartPageSubtotal.textContent = formatPrice(subtotal);
    }

    if (cartPageTotal) {
      cartPageTotal.textContent = formatPrice(subtotal);
    }
  }

  /* =====================================
           CLICK EVENTS
        ====================================== */

  cartPageItems?.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".cart-page-remove");

    const quantityButton = event.target.closest(".cart-page-qty-btn");

    const cart = getCart();

    /* REMOVE */

    if (removeButton) {
      const productId = Number(removeButton.dataset.productId);

      const updatedCart = cart.filter((item) => item.id !== productId);

      saveCart(updatedCart);

      renderCartPage();

      return;
    }

    /* QUANTITY */

    if (quantityButton) {
      const productId = Number(quantityButton.dataset.productId);

      const action = quantityButton.dataset.action;

      const item = cart.find((item) => item.id === productId);

      if (!item) {
        return;
      }

      if (action === "increase") {
        item.quantity++;
      }

      if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
          const index = cart.indexOf(item);

          cart.splice(index, 1);
        }
      }

      saveCart(cart);

      renderCartPage();
    }
  });

  /* =====================================
           CLEAR CART
        ====================================== */

  clearCartPage?.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      return;
    }

    const confirmed = confirm("Are you sure you want to clear your cart?");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("mmCart");

    renderCartPage();
  });

  /* =====================================
           INITIALIZE
        ====================================== */

  renderCartPage();
});
