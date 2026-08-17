/* =========================================
   CHECKOUT PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =====================================
           ELEMENTS
        ====================================== */

        const summaryItems =
            document.getElementById(
                "checkoutSummaryItems"
            );

        const subtotalElement =
            document.getElementById(
                "checkoutSubtotal"
            );

        const shippingElement =
            document.getElementById(
                "checkoutShipping"
            );

        const totalElement =
            document.getElementById(
                "checkoutTotal"
            );

        const placeOrderButton =
            document.getElementById(
                "checkoutPlaceOrder"
            );


       /* =========================================
   CHECKOUT FIELDS
========================================= */

const checkoutEmail =
    document.getElementById("checkoutEmail");

const checkoutPhone =
    document.getElementById("checkoutPhone");

const checkoutName =
    document.getElementById("checkoutName");

const checkoutAddress =
    document.getElementById("checkoutAddress");

const checkoutCity =
    document.getElementById("checkoutCity");

const checkoutState =
    document.getElementById("checkoutState");

const checkoutPincode =
    document.getElementById("checkoutPincode");


const requiredFields = [
    checkoutEmail,
    checkoutPhone,
    checkoutName,
    checkoutAddress,
    checkoutCity,
    checkoutState,
    checkoutPincode
];


/* =========================================
   ERROR MESSAGE
========================================= */

function showFieldError(field, message) {

    if (!field) {
        return;
    }

    const wrapper =
        field.closest(".checkout-field");

    if (!wrapper) {
        return;
    }

    let error =
        wrapper.querySelector(
            ".checkout-field-message"
        );

    if (!error) {

        error =
            document.createElement("small");

        error.className =
            "checkout-field-message";

        wrapper.appendChild(error);

    }

    error.textContent =
        message;

    wrapper.classList.add(
        "has-error"
    );

    wrapper.classList.remove(
        "is-valid"
    );

}


/* =========================================
   CLEAR ERROR
========================================= */

function clearFieldError(field) {

    if (!field) {
        return;
    }

    const wrapper =
        field.closest(".checkout-field");

    if (!wrapper) {
        return;
    }

    wrapper
        .querySelector(
            ".checkout-field-message"
        )
        ?.remove();

    wrapper.classList.remove(
        "has-error"
    );

}


/* =========================================
   MARK VALID
========================================= */

function markFieldValid(field) {

    if (!field) {
        return;
    }

    const wrapper =
        field.closest(".checkout-field");

    if (!wrapper) {
        return;
    }

    clearFieldError(field);

    wrapper.classList.add(
        "is-valid"
    );

}


/* =========================================
   VALIDATE INDIVIDUAL FIELD
========================================= */

function validateField(field) {

    if (!field) {
        return false;
    }

    const value =
        field.value.trim();


    /* Empty */

    if (!value) {

        showFieldError(
            field,
            "This field is required."
        );

        return false;
    }


    /* Email */

    if (
        field.id === "checkoutEmail"
    ) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(value)
        ) {

            showFieldError(
                field,
                "Please enter a valid email address."
            );

            return false;
        }
    }


    /* Phone */

    if (
        field.id === "checkoutPhone"
    ) {

        const digits =
            value.replace(/\D/g, "");

        if (digits.length !== 10) {

            showFieldError(
                field,
                "Please enter a valid 10-digit phone number."
            );

            return false;
        }
    }


    /* PIN */

    if (
        field.id === "checkoutPincode"
    ) {

        const digits =
            value.replace(/\D/g, "");

        if (digits.length !== 6) {

            showFieldError(
                field,
                "Please enter a valid 6-digit PIN code."
            );

            return false;
        }
    }


    markFieldValid(field);

    return true;
}


/* =========================================
   CHECK ENTIRE FORM
========================================= */

function isCheckoutFormValid() {

    let valid = true;


    laceOrderButton.disabled =
        !isCheckoutFormValid();
}


/* LISTEN FOR USER INPUT */

requiredFields.forEach((field) => {

    field.addEventListener(
        "input",
        () => {

            validateField(field);

            updatePlaceOrderButton();

        }
    );


    field.addEventListener(
        "blur",
        () => {

            validateField(field);

            updatePlaceOrderButton();

        }
    );

});

        /* =====================================
           HELPERS
        ====================================== */

        function formatPrice(price) {

            return `₹${Number(price).toLocaleString(
                "en-IN"
            )}`;

        }


        function getCart() {

            try {

                return JSON.parse(
                    localStorage.getItem("mmCart") ||
                    "[]"
                );

            } catch (error) {

                console.error(
                    "Unable to read cart:",
                    error
                );

                return [];

            }

        }


        /* =====================================
           RENDER ORDER SUMMARY
        ====================================== */

        function renderCheckout() {

            const cart = getCart();


            /* Empty cart */

            if (cart.length === 0) {

                window.location.href =
                    "cart.html";

                return;

            }


            let subtotal = 0;


            if (summaryItems) {

                summaryItems.innerHTML = "";

            }


            cart.forEach((item) => {

                const product =
                    window.products?.find(
                        (product) =>
                            product.id === Number(item.id)
                    );


                if (!product) {
                    return;
                }


                const quantity =
                    Number(item.quantity) || 1;


                const itemTotal =
                    product.price * quantity;


                subtotal += itemTotal;


                const summaryItem =
                    document.createElement("div");


                summaryItem.className =
                    "checkout-summary-item";


                summaryItem.innerHTML = `

                    <a
                        href="product.html?id=${product.id}"
                        class="checkout-summary-item-image"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >

                    </a>


                    <div
                        class="checkout-summary-item-info"
                    >

                        <p
                            class="checkout-summary-item-name"
                        >
                            ${product.name}
                        </p>

                        <span
                            class="checkout-summary-item-qty"
                        >
                            Qty: ${quantity}
                        </span>

                    </div>


                    <strong
                        class="checkout-summary-item-price"
                    >
                        ${formatPrice(itemTotal)}
                    </strong>

                `;


                summaryItems?.appendChild(
                    summaryItem
                );

            });


            /* Subtotal */

            if (subtotalElement) {

                subtotalElement.textContent =
                    formatPrice(subtotal);

            }


            /* Shipping */

            if (shippingElement) {

                shippingElement.textContent =
                    "Free";

            }


            /* Total */

            if (totalElement) {

                totalElement.textContent =
                    formatPrice(subtotal);

            }

        }


        /* ================================
        CHECK
        ==================================== */

        requiredFields.forEach((field) => {

    field.addEventListener(
        "input",
        () => {

            if (
                field.value.trim()
            ) {

                validateField(field);

            } else {

                clearFieldError(field);

                const wrapper =
                    field.closest(
                        ".checkout-field"
                    );

                wrapper?.classList.remove(
                    "is-valid"
                );

            }

            updatePlaceOrderButton();

        }
    );


    field.addEventListener(
        "blur",
        () => {

            validateField(field);

            updatePlaceOrderButton();

        }
    );

});

        function isCheckoutFormValid() {

    const email =
        checkoutEmail.value.trim();

    const phone =
        checkoutPhone.value.replace(/\D/g, "");

    const name =
        checkoutName.value.trim();

    const address =
        checkoutAddress.value.trim();

    const city =
        checkoutCity.value.trim();

    const state =
        checkoutState.value.trim();

    const pincode =
        checkoutPincode.value.replace(/\D/g, "");


    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    return (
        validEmail &&
        phone.length === 10 &&
        name.length > 1 &&
        address.length > 3 &&
        city.length > 1 &&
        state.length > 1 &&
        pincode.length === 6
    );
}

function updatePlaceOrderButton() {

    placeOrderButton.disabled =
        !isCheckoutFormValid();

}

[
    checkoutEmail,
    checkoutPhone,
    checkoutName,
    checkoutAddress,
    checkoutCity,
    checkoutState,
    checkoutPincode
].forEach((field) => {

    field.addEventListener(
        "input",
        updatePlaceOrderButton
    );

    field.addEventListener(
        "change",
        updatePlaceOrderButton
    );

});

updatePlaceOrderButton();


        /* =====================================
           PLACE ORDER
        ====================================== */

        placeOrderButton?.addEventListener(
            "click",
            () => {

                console.log(
                    "Place Order clicked."
                );

            }
        );


        /* =========================================
   ORDER CONFIRMATION
========================================= */

const orderConfirmation =
    document.getElementById(
        "orderConfirmation"
    );


function playOrderSuccessSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        const audioContext =
            new AudioContext();

        const now =
            audioContext.currentTime;


        const notes = [
            {
                frequency: 523.25,
                start: 0,
                duration: 0.15
            },
            {
                frequency: 659.25,
                start: 0.11,
                duration: 0.15
            },
            {
                frequency: 783.99,
                start: 0.22,
                duration: 0.25
            }
        ];


        notes.forEach((note) => {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type = "sine";

            oscillator.frequency.setValueAtTime(
                note.frequency,
                now + note.start
            );


            gain.gain.setValueAtTime(
                0.0001,
                now + note.start
            );

            gain.gain.exponentialRampToValueAtTime(
                0.12,
                now + note.start + 0.02
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now +
                    note.start +
                    note.duration
            );


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            oscillator.start(
                now + note.start
            );

            oscillator.stop(
                now +
                    note.start +
                    note.duration +
                    0.03
            );

        });

    } catch (error) {

        console.warn(
            "Confirmation sound unavailable:",
            error
        );

    }

}


placeOrderButton?.addEventListener(
    "click",
    () => {

        /*
            Keep your existing validation here.
            If validation returns false, stop.
        */

        if (
            typeof validateCheckoutForm ===
            "function" &&
            !validateCheckoutForm()
        ) {
            return;
        }


        /* Play success sound */

        playOrderSuccessSound();


        /* Hide checkout */

        document
            .querySelector(".checkout-layout")
            ?.setAttribute(
                "hidden",
                ""
            );

        document
            .querySelector(".checkout-header")
            ?.setAttribute(
                "hidden",
                ""
            );


        /* Show confirmation */

        orderConfirmation
            ?.removeAttribute(
                "hidden"
            );


        /* Clear cart */

        localStorage.removeItem(
            "mmCart"
        );


        /* Update global cart count */

        const cartCount =
            document.getElementById(
                "cartCount"
            );

        if (cartCount) {
            cartCount.textContent = "0";
        }

    }
);

const orderNumber =
    `MM${Date.now()
        .toString()
        .slice(-6)}`;

const confirmationOrderNumber =
    document.getElementById(
        "confirmationOrderNumber"
    );

if (confirmationOrderNumber) {

    confirmationOrderNumber.textContent =
        orderNumber;

}

        /* =====================================
           INITIALIZE
        ====================================== */

        renderCheckout();

    }
);