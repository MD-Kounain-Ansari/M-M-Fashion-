/* =========================================
   SHOP PAGE
   PRODUCT RENDERING
========================================= */

const shopProductGrid =
    document.getElementById("shopProductGrid");

const shopProductCount =
    document.getElementById("shopProductCount");

const shopNoResults =
    document.getElementById("shopNoResults");





const urlParams =
    new URLSearchParams(window.location.search);

const searchQuery =
    urlParams.get("search") || "";

const shopSearchState =
    document.getElementById("shopSearchState");

const shopSearchQuery =
    document.getElementById("shopSearchQuery");

const clearShopSearch =
    document.getElementById("clearShopSearch");


/* =========================================
   SEARCH PRODUCTS
========================================= */




function updateShopSearchState() {

    const query =
        searchQuery.trim();

    if (
        !query ||
        !shopSearchState ||
        !shopSearchQuery
    ) {
        shopSearchState?.setAttribute(
            "hidden",
            ""
        );

        return;
    }


    shopSearchQuery.textContent =
        `"${query}"`;

    shopSearchState.removeAttribute(
        "hidden"
    );

}

function getSearchFilteredProducts(productList) {

    const query =
        searchQuery.trim().toLowerCase();

    if (!query) {
        return [...productList];
    }

    return productList.filter((product) => {

        const searchableText = [
            product.name,
            product.category,
            product.badge
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(query);

    });
}

clearShopSearch?.addEventListener(
    "click",
    () => {

        window.location.href =
            "shop.html";

    }
);


/* =========================================
   FORMAT PRICE
========================================= */

function formatShopPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


/* =========================================
   RENDER PRODUCTS
========================================= */
function renderShopProducts(productList) {

    if (!shopProductGrid) {
        return;
    }

    shopProductGrid.innerHTML = "";

    if (shopProductCount) {
        shopProductCount.textContent =
            `${productList.length} ${
                productList.length === 1
                    ? "Product"
                    : "Products"
            }`;
    }

    if (productList.length === 0) {

        shopNoResults?.removeAttribute("hidden");

        return;
    }

    shopNoResults?.setAttribute("hidden", "");

    productList.forEach((product) => {

        const card =
            document.createElement("article");

        card.className =
            "shop-product-card";

        const oldPriceHTML =
            product.oldPrice
                ? `
                    <span class="shop-old-price">
                        ${formatShopPrice(product.oldPrice)}
                    </span>
                `
                : "";

        const badgeHTML =
            product.badge
                ? `
                    <span class="shop-product-badge ${
                        product.badge === "SALE"
                            ? "sale"
                            : ""
                    }">
                        ${product.badge}
                    </span>
                `
                : "";

        card.innerHTML = `

            <div class="shop-product-image-wrapper">

                <a
                    href="product.html?id=${product.id}"
                    class="shop-product-image-link"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="shop-product-image"
                        loading="lazy"
                    >
                </a>

                ${badgeHTML}

                <button
                    type="button"
                    class="shop-wishlist-btn"
                    data-product-id="${product.id}"
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>

            <button
                type="button"
                class="shop-add-cart-btn"
                data-product-id="${product.id}"
            >
                Add to Cart
            </button>

            <div class="shop-product-info">

                <p class="shop-product-category">
                    ${product.category}
                </p>

                <h2 class="shop-product-name">
                    ${product.name}
                </h2>

                <div class="shop-product-price">

                    <span>
                        ${formatShopPrice(product.price)}
                    </span>

                    ${oldPriceHTML}

                </div>

            </div>
        `;

        shopProductGrid.appendChild(card);

    });

    // THIS IS THE IMPORTANT PART
    updateShopWishlistButtons();
}

/* =========================================
   UPDATE SHOP WISHLIST BUTTONS
========================================= */

function updateShopWishlistButtons() {

    const wishlist = JSON.parse(
        localStorage.getItem("mmWishlist") || "[]"
    ).map(String);

    const buttons = document.querySelectorAll(
        ".shop-wishlist-btn"
    );

    buttons.forEach((button) => {

        const productId =
            String(button.dataset.productId);

        const isWishlisted =
            wishlist.includes(productId);

        button.textContent =
            isWishlisted ? "♥" : "♡";

        button.classList.toggle(
            "is-wishlisted",
            isWishlisted
        );

        button.setAttribute(
            "aria-label",
            isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
        );

    });
}

/* =========================================
   SHOP FILTER + SORT STATE
========================================= */

const shopParams =
    new URLSearchParams(
        window.location.search
    );

const urlFilter =
    shopParams.get("filter");


const allowedFilters = [
    "all",
    "men",
    "unisex",
    "new",
    "sale"
];


let activeFilter =
    allowedFilters.includes(urlFilter)
        ? urlFilter
        : "all";


let activeSort = "newest";


/* =========================================
   SHOP ELEMENTS
========================================= */

const shopFilters =
    document.querySelectorAll(".shop-filter");

const sortProducts =
    document.getElementById("sortProducts");

const resetShopFilters =
    document.getElementById("resetShopFilters");


/* =========================================
   SET INITIAL ACTIVE FILTER
========================================= */

shopFilters.forEach((button) => {

    button.classList.toggle(
        "active",
        button.dataset.filter === activeFilter
    );

});



/* =========================================
   GET FILTERED PRODUCTS
========================================= */

function getFilteredProducts() {

    switch (activeFilter) {

        case "men":

            return products.filter(
                (product) =>
                    product.category.toLowerCase() === "men"
            );


        case "unisex":

            return products.filter(
                (product) =>
                    product.category.toLowerCase() === "unisex"
            );


        case "new":

            return products.filter(
                (product) =>
                    product.badge === "NEW"
            );


        case "sale":

            return products.filter(
                (product) =>
                    product.badge === "SALE"
            );


        case "all":
        default:

            return [...products];
    }
}


/* =========================================
   SORT PRODUCTS
========================================= */

function sortShopProducts(productList) {

    const sortedProducts = [...productList];

    switch (activeSort) {

        case "price-low":

            sortedProducts.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            sortedProducts.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "newest":

        default:

            /*
               products.js is already stored
               newest-first for now.
            */

            break;
    }

    return sortedProducts;
}


/* =========================================
   UPDATE SHOP
========================================= */

function updateShopProducts() {

    let filteredProducts =
        getFilteredProducts();


    /* Apply search */

    filteredProducts =
        getSearchFilteredProducts(
            filteredProducts
        );


    /* Apply sorting */

    const sortedProducts =
        sortShopProducts(
            filteredProducts
        );


    renderShopProducts(
        sortedProducts
    );

}


/* =========================================
   FILTER BUTTONS
========================================= */

shopFilters.forEach((button) => {

    button.addEventListener("click", () => {

        /* Active filter */

        shopFilters.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");


        /* Save filter */

        activeFilter =
            button.dataset.filter;


        /* Re-render */

        updateShopProducts();

    });

});


/* =========================================
   SORT DROPDOWN
========================================= */

sortProducts?.addEventListener(
    "change",
    () => {

        activeSort =
            sortProducts.value;

        updateShopProducts();

    }
);


/* =========================================
   RESET
========================================= */

resetShopFilters?.addEventListener(
    "click",
    () => {

        activeFilter = "all";
        activeSort = "newest";

        shopFilters.forEach((button) => {
            button.classList.remove("active");
        });

        const allButton =
            document.querySelector(
                '.shop-filter[data-filter="all"]'
            );

        allButton?.classList.add("active");

        if (sortProducts) {
            sortProducts.value = "newest";
        }

        /* Remove search query completely */

        window.location.href = "shop.html";

    }
);

/* =========================================
   SHOP WISHLIST
========================================= */

function getShopWishlist() {
    return JSON.parse(
        localStorage.getItem("mmWishlist") || "[]"
    ).map(String);
}


function saveShopWishlist(wishlist) {
    localStorage.setItem(
        "mmWishlist",
        JSON.stringify(wishlist)
    );
}


/* =========================================
   UPDATE HEARTS
========================================= */

function updateShopWishlistButtons() {

    const wishlist = getShopWishlist();

    const buttons = document.querySelectorAll(
        ".shop-wishlist-btn"
    );

    buttons.forEach((button) => {

        const productId =
            String(button.dataset.productId);

        const saved =
            wishlist.includes(productId);

        button.textContent = saved ? "♥" : "♡";

        button.classList.toggle(
            "is-wishlisted",
            saved
        );

        button.setAttribute(
            "aria-label",
            saved
                ? "Remove from wishlist"
                : "Add to wishlist"
        );

    });
}


/* =========================================
   WISHLIST CLICK
========================================= */

shopProductGrid?.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".shop-wishlist-btn"
            );

        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const productId =
            String(button.dataset.productId);

        let wishlist =
            getShopWishlist();

        const index =
            wishlist.indexOf(productId);

        if (index === -1) {

            wishlist.push(productId);

            showShopToast(
                "Added to wishlist"
            );

        } else {

            wishlist.splice(index, 1);

            showShopToast(
                "Removed from wishlist"
            );

        }

        saveShopWishlist(wishlist);

        updateShopWishlistButtons();

    }
);

/* =========================================
   SHOP ADD TO CART
========================================= */

shopProductGrid?.addEventListener(
    "click",
    (event) => {

        const cartButton =
            event.target.closest(
                ".shop-add-cart-btn"
            );

        if (!cartButton) {
            return;
        }

        event.preventDefault();

        const productId =
            Number(
                cartButton.dataset.productId
            );

        if (
            typeof addToCart === "function"
        ) {
            addToCart(productId);
        }

    }
);


function showShopToast(message) {

    let toast =
        document.getElementById(
            "shopToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "shopToast";

        toast.className =
            "cart-toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;

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
   INITIALIZE
========================================= */

updateShopSearchState();
updateShopProducts();

if (
    typeof products !== "undefined" &&
    Array.isArray(products)
) {

    updateShopProducts();

} else {

    console.error(
        "Product data is not available. Check products.js."
    );

}

