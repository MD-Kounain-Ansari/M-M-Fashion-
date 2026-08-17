/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("is-open");

        mobileMenuBtn.classList.toggle("is-open", isOpen);

        mobileMenuBtn.setAttribute("aria-expanded", isOpen);
        mobileNav.setAttribute("aria-hidden", !isOpen);
    });
}


/* =========================================
   CLOSE MOBILE NAV AFTER LINK CLICK
========================================= */

const mobileNavLinks = mobileNav?.querySelectorAll("a");

mobileNavLinks?.forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        mobileMenuBtn.classList.remove("is-open");

        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
    });
});

/* =========================================
   CAMPAIGN SLIDER
========================================= */

const campaignSlides = document.querySelectorAll(".campaign-slide");
const campaignDots = document.querySelectorAll(".campaign-dot");

const campaignPrev = document.querySelector(".campaign-prev");
const campaignNext = document.querySelector(".campaign-next");

let currentCampaign = 0;
let campaignTimer;


/* =========================================
   SHOW SLIDE
========================================= */

function showCampaign(index) {

    if (index >= campaignSlides.length) {
        currentCampaign = 0;
    } else if (index < 0) {
        currentCampaign = campaignSlides.length - 1;
    } else {
        currentCampaign = index;
    }


    /* Remove active class */

    campaignSlides.forEach((slide) => {
        slide.classList.remove("active");
    });

    campaignDots.forEach((dot) => {
        dot.classList.remove("active");
    });


    /* Activate current slide */

    campaignSlides[currentCampaign].classList.add("active");

    campaignDots[currentCampaign].classList.add("active");
}


/* =========================================
   NEXT
========================================= */

function nextCampaign() {

    showCampaign(currentCampaign + 1);

    resetCampaignTimer();
}


/* =========================================
   PREVIOUS
========================================= */

function previousCampaign() {

    showCampaign(currentCampaign - 1);

    resetCampaignTimer();
}


/* =========================================
   BUTTON EVENTS
========================================= */

campaignNext?.addEventListener("click", nextCampaign);

campaignPrev?.addEventListener("click", previousCampaign);


/* =========================================
   DOT EVENTS
========================================= */

campaignDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideIndex = Number(
            dot.dataset.slide
        );

        showCampaign(slideIndex);

        resetCampaignTimer();

    });

});


/* =========================================
   AUTO SLIDE
========================================= */

function startCampaignTimer() {

    campaignTimer = setInterval(() => {

        showCampaign(currentCampaign + 1);

    }, 3000);

}


function resetCampaignTimer() {

    clearInterval(campaignTimer);

    startCampaignTimer();

}


/* =========================================
   START
========================================= */

if (campaignSlides.length > 0) {

    showCampaign(0);

    startCampaignTimer();

}



/* =========================================
   NEWSLETTER SUBSCRIPTION
========================================= */

const newsletterForm =
    document.querySelector("#newsletterForm");

const newsletterEmail =
    document.querySelector("#newsletterEmail");

const newsletterMessage =
    document.querySelector("#newsletterMessage");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email = newsletterEmail.value.trim();


        /* Clear previous message */

        newsletterMessage.textContent = "";

        newsletterMessage.classList.remove(
            "show",
            "success",
            "error"
        );


        /* Validate empty email */

        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            newsletterMessage.classList.add(
                "show",
                "error"
            );

            newsletterEmail.focus();

            return;
        }


        /* Validate email format */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            newsletterMessage.textContent =
                "Please enter a valid email address.";

            newsletterMessage.classList.add(
                "show",
                "error"
            );

            newsletterEmail.focus();

            return;
        }


        /* Success */

        newsletterMessage.textContent =
            "You're subscribed. Welcome to M&M.";

        newsletterMessage.classList.add(
            "show",
            "success"
        );


        /* Clear input */

        newsletterEmail.value = "";


        /* Optional button feedback */

        const submitButton =
            newsletterForm.querySelector(
                ".newsletter-submit"
            );

        const originalText =
            submitButton.innerHTML;


        submitButton.innerHTML =
            "Subscribed ✓";


        setTimeout(() => {

            submitButton.innerHTML =
                originalText;

        }, 3000);

    });

}

/* =========================================
   NAVBAR SEARCH
========================================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");


function openSearch() {

    if (!searchPanel || !searchInput) {
        return;
    }

    searchPanel.classList.add("is-open");

    searchPanel.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        searchInput.focus();
    });
}


function closeSearch() {

    if (!searchPanel || !searchInput) {
        return;
    }

    searchPanel.classList.remove("is-open");

    searchPanel.setAttribute("aria-hidden", "true");

    searchInput.value = "";

    if (searchBtn) {
        searchBtn.focus();
    }
}


/* Open */

searchBtn?.addEventListener("click", () => {

    const isOpen = searchPanel.classList.contains("is-open");

    if (isOpen) {
        closeSearch();
    } else {
        openSearch();
    }

});


/* Close */

searchClose?.addEventListener("click", closeSearch);


/* Submit */

/* =========================================
   SEARCH
========================================= */

searchForm?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const query =
            searchInput.value.trim();

        if (!query) {
            searchInput.focus();
            return;
        }

        const encodedQuery =
            encodeURIComponent(query);

        window.location.href =
            `shop.html?search=${encodedQuery}`;

    }
);


/* Escape key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeSearch();
    }

});

/* =========================================
   WISHLIST
========================================= */

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

let wishlist = JSON.parse(
    localStorage.getItem("mmWishlist") || "[]"
).map(String);


/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist() {
    localStorage.setItem(
        "mmWishlist",
        JSON.stringify(wishlist)
    );
}


/* =========================================
   UPDATE BUTTON
========================================= */

function updateWishlistButton(button) {

    const productId = String(
        button.dataset.productId
    );

    const isWishlisted =
        wishlist.includes(productId);


    if (isWishlisted) {

        button.textContent = "♥";

        button.classList.add("is-wishlisted");

        button.dataset.tooltip =
            "Remove from Wishlist";

        button.setAttribute(
            "aria-label",
            "Remove from wishlist"
        );

    } else {

        button.textContent = "♡";

        button.classList.remove(
            "is-wishlisted"
        );

        button.dataset.tooltip =
            "Add to Wishlist";

        button.setAttribute(
            "aria-label",
            "Add to wishlist"
        );
    }
}


/* =========================================
   TOAST
========================================= */

function showWishlistToast(message) {

    let toast =
        document.getElementById("wishlistToast");


    if (!toast) {

        toast = document.createElement("div");

        toast.id = "wishlistToast";

        toast.className =
            "wishlist-toast";

        document.body.appendChild(toast);
    }


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* =========================================
   INITIALIZE BUTTONS
========================================= */

wishlistButtons.forEach((button) => {

    const productId = String(
        button.dataset.productId
    );


    /* Safety check */

    if (!productId || productId === "undefined") {
        console.warn(
            "Wishlist button is missing a valid product ID:",
            button
        );

        return;
    }


    /* Restore state after refresh */

    updateWishlistButton(button);


    /* Click */

    button.addEventListener("click", () => {

        const index =
            wishlist.indexOf(productId);


        /* ==============================
           ALREADY IN WISHLIST
        ============================== */

        if (index !== -1) {

            wishlist.splice(index, 1);

            saveWishlist();

            updateWishlistButton(button);

            showWishlistToast(
                "Removed from wishlist"
            );

            return;
        }


        /* ==============================
           NOT IN WISHLIST
        ============================== */

        wishlist.push(productId);

        saveWishlist();

        updateWishlistButton(button);

        showWishlistToast(
            "Added to wishlist"
        );

    });

});


/* =========================================
   LOAD CART
========================================= */

let cart = JSON.parse(
    localStorage.getItem("mmCart") || "[]"
);



/* =========================================
   CART ELEMENTS
========================================= */

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const cartDrawer = document.getElementById("cartDrawer");
const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
const cartDrawerClose = document.getElementById("cartDrawerClose");
const cartEmptyClose = document.getElementById("cartEmptyClose");

const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSubtotal = document.getElementById("cartSubtotal");

const clearCartBtn =
    document.getElementById("clearCartBtn");


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "mmCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;

}


/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    if (cartCount) {

        cartCount.textContent =
            totalItems;

        cartCount.setAttribute(
            "aria-label",
            `${totalItems} items in cart`
        );

    }

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product =
    window.products?.find(
        (item) => item.id === productId
    );
    
    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            (item) => item.id === product.id
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    updateCartCount();

    showCartToast(
        `${product.name} added to cart`
    );

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            (cartItem) =>
                cartItem.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }


    saveCart();

    renderCart();

    updateCartCount();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        (item) => item.id !== productId
    );


    saveCart();

    renderCart();

    updateCartCount();

    showCartToast(
        "Removed from cart"
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    if (!cartItems || !cartEmpty) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartEmpty.classList.add(
            "is-visible"
        );

        cartItems.style.display = "none";

        if (cartSubtotal) {
            cartSubtotal.textContent = "₹0";
        }

        return;
    }

    clearCartBtn?.addEventListener("click", () => {

    if (cart.length === 0) {
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to clear your cart?"
    );

    if (!confirmed) {
        return;
    }

    cart = [];

    saveCart();

    renderCart();

    updateCartCount();

    showCartToast(
        "Cart cleared"
    );

});

    cartEmpty.classList.remove(
        "is-visible"
    );

    cartItems.style.display = "block";


    let subtotal = 0;


    cart.forEach((item) => {

        const product =
    window.products?.find(
        (product) => product.id === item.id
    );

        if (!product) {
            return;
        }


        subtotal +=
            product.price * item.quantity;


        const cartItem =
            document.createElement("article");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image"
            >

            <div class="cart-item-info">

                <p class="cart-item-category">
                    ${product.category}
                </p>

                <h3 class="cart-item-name">
                    ${product.name}
                </h3>

                <p class="cart-item-price">
                    ${formatPrice(product.price)}
                </p>

                <div class="cart-item-controls">

                    <button
                        type="button"
                        class="quantity-btn"
                        data-action="decrease"
                        data-id="${product.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>

                    <span class="quantity-value">
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="quantity-btn"
                        data-action="increase"
                        data-id="${product.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                type="button"
                class="cart-item-remove"
                data-action="remove"
                data-id="${product.id}"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatPrice(subtotal);

    }

}


/* =========================================
   CART BUTTON EVENTS
========================================= */



cartBtn?.addEventListener(
    "click",
    openCart
);

cartDrawerClose?.addEventListener(
    "click",
    closeCart
);

cartDrawerOverlay?.addEventListener(
    "click",
    closeCart
);

cartEmptyClose?.addEventListener(
    "click",
    closeCart
);


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    if (!cartDrawer) {
        console.error("Cart drawer element not found.");
        return;
    }

    renderCart();
    updateCartCount();

    cartDrawer.classList.add("is-open");
    cartDrawerOverlay?.classList.add("is-open");

    cartDrawer.setAttribute("aria-hidden", "false");
    cartDrawerOverlay?.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    if (!cartDrawer) {
        return;
    }

    cartDrawer.classList.remove("is-open");
    cartDrawerOverlay?.classList.remove("is-open");

    cartDrawer.setAttribute("aria-hidden", "true");
    cartDrawerOverlay?.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


/* =========================================
   CART EVENTS
========================================= */

cartBtn?.addEventListener("click", openCart);

cartDrawerClose?.addEventListener(
    "click",
    closeCart
);

cartDrawerOverlay?.addEventListener(
    "click",
    closeCart
);

cartEmptyClose?.addEventListener(
    "click",
    closeCart
);


/* =========================================
   CART ITEM ACTIONS
========================================= */

cartItems?.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                "[data-action]"
            );

        if (!button) {
            return;
        }


        const productId =
            Number(button.dataset.id);

        const action =
            button.dataset.action;


        if (action === "increase") {

            changeCartQuantity(
                productId,
                1
            );

        }

        if (action === "decrease") {

            changeCartQuantity(
                productId,
                -1
            );

        }

        if (action === "remove") {

            removeFromCart(
                productId
            );

        }

    }
);


/* =========================================
   ADD TO CART BUTTONS
========================================= */

const addToCartButtons =
    document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        const productId =
            Number(button.dataset.productId);

        addToCart(productId);

        

    });

});

/* =========================================
   CART TOAST
========================================= */

function showCartToast(message) {

    let toast =
        document.getElementById(
            "cartToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "cartToast";

        toast.className =
            "cart-toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent = message;

    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2200);

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            cartDrawer?.classList.contains(
                "is-open"
            )
        ) {

            closeCart();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateCartCount();

renderCart();

