/* =========================================
   PRODUCT DETAILS PAGE
========================================= */

const productParams =
    new URLSearchParams(window.location.search);

const productId =
    Number(productParams.get("id"));


/* =========================================
   ELEMENTS
========================================= */

const productPage =
    document.getElementById("productPage");

const productBreadcrumbName =
    document.getElementById(
        "productBreadcrumbName"
    );

const productMainImage =
    document.getElementById("productMainImage");

const productCategory =
    document.getElementById("productCategory");


const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productOldPrice =
    document.getElementById("productOldPrice");

const productDiscount =
    document.getElementById("productDiscount");

const productColors =
    document.getElementById("productColors");

const productSizes =
    document.getElementById("productSizes");

const selectedColor =
    document.getElementById("selectedColor");

const productAddToCartBtn =
    document.getElementById(
        "productAddToCartBtn"
    );

const productWishlistBtn =
    document.getElementById(
        "productWishlistBtn"
    );

const quantityMinus =
    document.getElementById("quantityMinus");

const quantityPlus =
    document.getElementById("quantityPlus");

const productQuantity =
    document.getElementById(
        "productQuantity"
    );

const productThumbnails =
    document.getElementById("productThumbnails");

const sizeGuideBtn =
    document.getElementById("sizeGuideBtn");

const sizeGuideModal =
    document.getElementById("sizeGuideModal");

const sizeGuideOverlay =
    document.getElementById("sizeGuideOverlay");

const sizeGuideClose =
    document.getElementById("sizeGuideClose");

const reviewsToggle =
    document.getElementById("reviewsToggle");

const reviewsContent =
    document.getElementById("reviewsContent");

const productDescription =
    document.getElementById("productDescription");

const productFit =
    document.getElementById("productFit");

const productMaterial =
    document.getElementById("productMaterial");

const productCare =
    document.getElementById("productCare");

const productDelivery =
    document.getElementById("productDelivery");

const productPayment =
    document.getElementById("productPayment");

const similarProductsGrid =
    document.getElementById(
        "similarProductsGrid"
    );

const alsoBoughtGrid =
    document.getElementById(
        "alsoBoughtGrid"
    );

/* =========================================
   FIND PRODUCT
========================================= */

const product =
    window.products?.find(
        (item) => item.id === productId
    );


/* =========================================
   PRODUCT NOT FOUND
========================================= */

if (!product) {

    if (productPage) {

        productPage.innerHTML = `

            <div class="product-not-found">

                <span>
                    404
                </span>

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The product you're looking for
                    doesn't exist.
                </p>

                <a href="shop.html">
                    Back to Shop
                </a>

            </div>

        `;

    }

} else {

    renderProduct();

}

function renderProductGallery(images) {

    if (!productMainImage || !productThumbnails) {
        return;
    }

    productThumbnails.innerHTML = "";

    if (!images || images.length === 0) {
        return;
    }


    // Show first image in the main image area
    productMainImage.src = images[0];

    productMainImage.alt =
        `${product.name} view 1`;


    // Create exactly one thumbnail per image
    images.forEach((image, index) => {

        const thumbnail =
            document.createElement("button");

        thumbnail.type = "button";

        thumbnail.className =
            "product-thumbnail";

        if (index === 0) {
            thumbnail.classList.add("active");
        }


        thumbnail.innerHTML = `
            <img
                src="${image}"
                alt="${product.name} view ${index + 1}"
            >
        `;


        thumbnail.addEventListener(
            "click",
            () => {

                productMainImage.src =
                    image;

                productMainImage.alt =
                    `${product.name} view ${index + 1}`;


                productThumbnails
                    .querySelectorAll(
                        ".product-thumbnail"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "active"
                        );

                    });


                thumbnail.classList.add(
                    "active"
                );

            }
        );


        productThumbnails.appendChild(
            thumbnail
        );

    });

}

/* =========================================
   SIZE GUIDE
========================================= */

function openSizeGuide() {

    if (!sizeGuideModal) {
        return;
    }

    sizeGuideModal.classList.add("is-open");

    sizeGuideOverlay?.classList.add("is-open");

    sizeGuideModal.setAttribute(
        "aria-hidden",
        "false"
    );

    sizeGuideOverlay?.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


function closeSizeGuide() {

    if (!sizeGuideModal) {
        return;
    }

    sizeGuideModal.classList.remove("is-open");

    sizeGuideOverlay?.classList.remove("is-open");

    sizeGuideModal.setAttribute(
        "aria-hidden",
        "true"
    );

    sizeGuideOverlay?.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


sizeGuideBtn?.addEventListener(
    "click",
    openSizeGuide
);

sizeGuideClose?.addEventListener(
    "click",
    closeSizeGuide
);

sizeGuideOverlay?.addEventListener(
    "click",
    closeSizeGuide
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            sizeGuideModal?.classList.contains(
                "is-open"
            )
        ) {

            closeSizeGuide();

        }

    }
);

/* =========================================
   REVIEW
========================================= */

reviewsToggle?.addEventListener(
    "click",
    () => {

        const isOpen =
            reviewsToggle.getAttribute(
                "aria-expanded"
            ) === "true";


        reviewsToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        reviewsContent.hidden =
            isOpen;


        reviewsToggle
            .querySelector(
                ".reviews-arrow"
            )
            .textContent =
                isOpen ? "+" : "−";

    }
);


/* =========================================
   RENDER PRODUCT
========================================= */

function renderProduct() {

    /* Breadcrumb */

    if (productBreadcrumbName) {

        productBreadcrumbName.textContent =
            product.name;

    }


    /* Category */

    if (productCategory) {

        productCategory.textContent =
            product.category;

    }



    /* Product name */

    if (productName) {

        productName.textContent =
            product.name;

    }


    /* Price */

    if (productPrice) {

        productPrice.textContent =
            `₹${product.price.toLocaleString(
                "en-IN"
            )}`;

    }


    /* Old price */

    if (productOldPrice) {

        if (product.oldPrice) {

            productOldPrice.textContent =
                `₹${product.oldPrice.toLocaleString(
                    "en-IN"
                )}`;

            productOldPrice.style.display =
                "inline";

        } else {

            productOldPrice.style.display =
                "none";

        }

    }


    /* Discount */

    if (productDiscount) {

        if (product.discount) {

            productDiscount.textContent =
                product.discount;

            productDiscount.style.display =
                "inline";

        } else {

            productDiscount.style.display =
                "none";

        }

    }


    /* Main image */

    if (productMainImage) {

        productMainImage.src =
            product.images?.[0] ||
            product.image;

        productMainImage.alt =
            product.name;

    }


    /* Render colours */

    renderProductColors();


    /* Render sizes */

    renderProductSizes();


    /* Reset quantity */

    if (productQuantity) {

        productQuantity.textContent = "1";

    }

    renderProductGallery(
    product.images?.length
        ? product.images
        : [product.image]
);

if (productDescription) {
    productDescription.textContent =
        product.description || "";
}

if (productFit) {
    productFit.textContent =
        product.fit || "";
}

if (productMaterial) {
    productMaterial.textContent =
        product.material || "";
}

if (productCare) {
    productCare.textContent =
        product.care || "";
}

if (productDelivery) {
    productDelivery.textContent =
        product.delivery || "";
}

if (productPayment) {
    productPayment.textContent =
        product.payment || "";
}

}


const productAccordions =
    document.querySelectorAll(
        ".product-accordion-btn"
    );

productAccordions.forEach((button) => {

    button.addEventListener("click", () => {

        const content =
            button.nextElementSibling;

        const icon =
            button.querySelector(
                ".product-accordion-icon"
            );

        const isOpen =
            button.getAttribute(
                "aria-expanded"
            ) === "true";


        button.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        content.hidden = isOpen;

        if (icon) {
            icon.textContent =
                isOpen ? "+" : "−";
        }

    });

});

/* =========================================
   COLORS
========================================= */

function renderProductColors() {

    if (!productColors) {
        return;
    }

    productColors.innerHTML = "";

    if (
        !product.colors ||
        product.colors.length === 0
    ) {

        productColors.innerHTML = `
            <span class="no-color-options">
                Default
            </span>
        `;

        if (selectedColor) {
            selectedColor.textContent =
                "Default";
        }

        return;
    }


    product.colors.forEach(
        (color, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "product-color-btn";

            button.dataset.color =
                color.name;

            button.innerHTML = `
                <span
                    class="product-color-swatch"
                    style="
                        background-image:
                        url('${color.image}');
                    "
                ></span>

                <span>
                    ${color.name}
                </span>
            `;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".product-color-btn"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    if (selectedColor) {

                        selectedColor.textContent =
                            color.name;

                    }


                    if (
                        productMainImage &&
                        color.image
                    ) {

                        productMainImage.src =
                            color.image;

                    }

                }
            );


            productColors.appendChild(button);


            if (index === 0) {

                button.classList.add(
                    "active"
                );

                if (selectedColor) {

                    selectedColor.textContent =
                        color.name;

                }

            }

        }
    );
}

/* =========================================
   SIZES
========================================= */

function renderProductSizes() {

    if (!productSizes) {
        return;
    }

    productSizes.innerHTML = "";


    if (
        !product.sizes ||
        product.sizes.length === 0
    ) {

        productSizes.innerHTML = `
            <span class="no-size-options">
                No sizes available
            </span>
        `;

        return;
    }


    product.sizes.forEach(
        (size, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "product-size-btn";

            button.textContent =
                size;


            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".product-size-btn"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );

                }
            );


            productSizes.appendChild(button);


            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }

        }
    );
}

/* =========================================
   QUANTITY
========================================= */

let quantity = 1;


quantityMinus?.addEventListener(
    "click",
    () => {

        if (quantity <= 1) {
            return;
        }

        quantity--;

        productQuantity.textContent =
            quantity;

    }
);


quantityPlus?.addEventListener(
    "click",
    () => {

        if (quantity >= 10) {
            return;
        }

        quantity++;

        productQuantity.textContent =
            quantity;

    }
);

/* =========================================
   ADD TO CART
========================================= */

productAddToCartBtn?.addEventListener(
    "click",
    () => {

        if (
            typeof addToCart !== "function"
        ) {

            console.error(
                "addToCart() is not available."
            );

            return;
        }


        for (
            let i = 0;
            i < quantity;
            i++
        ) {

            addToCart(product.id);

        }

    }
);

/* =========================================
   RELATED PRODUCT CARD
========================================= */

function createRelatedProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "related-product-card";


    const oldPriceHTML =
        product.oldPrice
            ? `
                <span class="related-old-price">
                    ₹${product.oldPrice.toLocaleString("en-IN")}
                </span>
            `
            : "";


    const badgeHTML =
        product.badge
            ? `
                <span class="related-product-badge ${
                    product.badge === "SALE"
                        ? "sale"
                        : ""
                }">
                    ${product.badge}
                </span>
            `
            : "";


    card.innerHTML = `

        <div class="related-product-image-wrapper">

            <a
                href="product.html?id=${product.id}"
                class="related-product-image-link"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="related-product-image"
                    loading="lazy"
                >

            </a>

            ${badgeHTML}

        </div>


        <div class="related-product-info">

            <p class="related-product-category">
                ${product.category}
            </p>

            <h3 class="related-product-name">
                ${product.name}
            </h3>

            <div class="related-product-price">

                <span>
                    ₹${product.price.toLocaleString("en-IN")}
                </span>

                ${oldPriceHTML}

            </div>

        </div>

    `;


    return card;
}

/* =========================================
   SIMILAR ITEMS
========================================= */

function renderSimilarProducts() {

    if (!similarProductsGrid) {
        return;
    }


    similarProductsGrid.innerHTML = "";


    const ids =
        Array.isArray(product.similarProducts)
            ? product.similarProducts
            : [];


    ids.forEach((id) => {

        const relatedProduct =
            window.products?.find(
                (item) => item.id === id
            );


        if (!relatedProduct) {
            return;
        }


        similarProductsGrid.appendChild(
            createRelatedProductCard(
                relatedProduct
            )
        );

    });

}

/* =========================================
   OTHERS ALSO BOUGHT
========================================= */

function renderAlsoBought() {

    if (!alsoBoughtGrid) {
        return;
    }


    alsoBoughtGrid.innerHTML = "";


    const ids =
        Array.isArray(product.alsoBought)
            ? product.alsoBought
            : [];


    ids.forEach((id) => {

        const relatedProduct =
            window.products?.find(
                (item) => item.id === id
            );


        if (!relatedProduct) {
            return;
        }


        alsoBoughtGrid.appendChild(
            createRelatedProductCard(
                relatedProduct
            )
        );

    });

}

/* =========================================
   INITIALIZE
========================================= */


if (!product) {

    // product not found

} else {

    renderProduct();

    renderSimilarProducts();

    renderAlsoBought();

}