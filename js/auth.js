/* =========================================
   M&M AUTH SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
       MODAL ELEMENTS
    ====================================== */

  const authOverlay = document.getElementById("authOverlay");

  const authClose = document.getElementById("authClose");

  const authCardBg = document.getElementById("authCardBg");

  /* =====================================
       AUTH VIEWS
    ====================================== */

  const signupHero = document.getElementById("authSignupHero");

  const signinHero = document.getElementById("authSigninHero");

  const signupPanel = document.getElementById("authSignupForm");

  const signinPanel = document.getElementById("authSigninForm");

  const showSigninBtn = document.getElementById("showSigninBtn");

  const showSignupBtn = document.getElementById("showSignupBtn");

  /* =====================================
       OPEN MODAL
    ====================================== */

  function openAuthModal(event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (!authOverlay) {
      console.error("authOverlay was not found.");

      return;
    }

    authOverlay.removeAttribute("hidden");

    document.body.style.overflow = "hidden";
  }

  /* =====================================
       CLOSE MODAL
    ====================================== */

  function closeAuthModal() {
    if (!authOverlay) {
      return;
    }

    authOverlay.setAttribute("hidden", "");

    document.body.style.overflow = "";
  }

  /* =====================================
       ACCOUNT BUTTONS
       Desktop + Mobile
    ====================================== */

  document.querySelectorAll(".auth-account-trigger").forEach((button) => {
    button.addEventListener("click", openAuthModal);
  });

  /* =====================================
       CLOSE BUTTON
    ====================================== */

  authClose?.addEventListener("click", closeAuthModal);

  /* =====================================
       ESCAPE KEY
    ====================================== */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      authOverlay &&
      !authOverlay.hasAttribute("hidden")
    ) {
      closeAuthModal();
    }
  });

  /* =====================================
       SHOW SIGN IN
    ====================================== */

  function showSignin() {
    authCardBg?.classList.remove("signup-bg");

    authCardBg?.classList.add("signin-bg");

    signupHero?.classList.remove("active");

    signinHero?.classList.add("active");

    signupPanel?.classList.remove("active");

    signinPanel?.classList.add("active");
  }

  /* =====================================
       SHOW SIGN UP
    ====================================== */

  function showSignup() {
    authCardBg?.classList.remove("signin-bg");

    authCardBg?.classList.add("signup-bg");

    signinHero?.classList.remove("active");

    signupHero?.classList.add("active");

    signinPanel?.classList.remove("active");

    signupPanel?.classList.add("active");
  }

  showSigninBtn?.addEventListener("click", showSignin);

  showSignupBtn?.addEventListener("click", showSignup);

  /* =====================================
       FORM ELEMENTS
    ====================================== */

  const signupForm = document.getElementById("signupForm");

  const signinForm = document.getElementById("signinForm");

  /* =========================================
   AUTH VALIDATION
========================================= */

  function getErrorElement(field) {
    return field?.closest(".auth-field")?.querySelector(".auth-field-error");
  }

  function showError(field, message) {
    if (!field) {
      return false;
    }

    const wrapper = field.closest(".auth-field");

    const error = getErrorElement(field);

    wrapper?.classList.add("has-error");
    wrapper?.classList.remove("is-valid");

    if (error) {
      error.textContent = message;
    }
  }

  function clearError(field) {
    if (!field) {
      return;
    }

    const wrapper = field.closest(".auth-field");

    const error = getErrorElement(field);

    wrapper?.classList.remove("has-error");
    wrapper?.classList.add("is-valid");

    if (error) {
      error.textContent = "";
    }
  }

  /* =========================================
   INDIVIDUAL FIELD VALIDATION
========================================= */

  function validateSignupField(field) {
    if (!field) {
      return false;
    }

    const value = field.value.trim();

    /* FULL NAME */

    if (field.id === "signupName") {
      if (!value) {
        return showError(field, "Full name is required.");
      }

      if (value.length < 2) {
        return showError(field, "Please enter your full name.");
      }
    }

    /* EMAIL */

    if (field.id === "signupEmail") {
      if (!value) {
        return showError(field, "Email is required.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        return showError(field, "Enter a valid email address.");
      }
    }

    /* PHONE */

    if (field.id === "signupPhone") {
      if (!value) {
        return showError(field, "Phone number is required.");
      }

      const digits = value.replace(/\D/g, "");

      if (digits.length !== 10) {
        return showError(field, "Enter a 10 digit phone number.");
      }
    }

    /* PASSWORD */

    if (field.id === "signupPassword") {
      if (!value) {
        return showError(field, "Password is required.");
      }

      if (value.length < 8) {
        return showError(field, "Password must be at least 8 characters.");
      }

      const confirmPassword = document.getElementById("signupConfirmPassword");

      if (confirmPassword && confirmPassword.value) {
        validateSignupField(confirmPassword);
      }
    }

    /* CONFIRM PASSWORD */

    if (field.id === "signupConfirmPassword") {
      const password = document.getElementById("signupPassword");

      if (!value) {
        return showError(field, "Please confirm your password.");
      }

      if (!password || value !== password.value) {
        return showError(field, "Passwords do not match.");
      }
    }

    clearError(field);

    return true;
  }

  /* =========================================
   SIGN IN FIELD VALIDATION
========================================= */

  function validateSigninField(field) {
    if (!field) {
      return false;
    }

    const value = field.value.trim();

    /* EMAIL */

    if (field.id === "signinEmail") {
      if (!value) {
        return showError(field, "Email is required.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
        return showError(field, "Enter a valid email address.");
      }
    }

    /* PASSWORD */

    if (field.id === "signinPassword") {
      if (!value) {
        return showError(field, "Password is required.");
      }

      if (value.length < 8) {
        return showError(field, "Password must be at least 8 characters.");
      }
    }

    clearError(field);

    return true;
  }

  /* =========================================
   CHECK WHOLE SIGNUP FORM
   No error messages are created here.
========================================= */

  function isSignupFormValid() {
    const fields = [
      document.getElementById("signupName"),
      document.getElementById("signupEmail"),
      document.getElementById("signupPhone"),
      document.getElementById("signupPassword"),
      document.getElementById("signupConfirmPassword"),
    ];

    return fields.every((field) => {
      if (!field) {
        return false;
      }

      const value = field.value.trim();

      if (field.id === "signupName") {
        return value.length >= 2;
      }

      if (field.id === "signupEmail") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      if (field.id === "signupPhone") {
        return value.replace(/\D/g, "").length === 10;
      }

      if (field.id === "signupPassword") {
        return value.length >= 8;
      }

      if (field.id === "signupConfirmPassword") {
        const password = document.getElementById("signupPassword");

        return value.length > 0 && value === password?.value;
      }

      return false;
    });
  }

  /* =========================================
   CHECK WHOLE SIGNIN FORM
========================================= */

  function isSigninFormValid() {
    const email = document.getElementById("signinEmail");

    const password = document.getElementById("signinPassword");

    if (!email || !password) {
      return false;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    return validEmail && password.value.length >= 8;
  }

  /* =========================================
   UPDATE BUTTONS
========================================= */

  function updateSignupButton() {
    const form = document.getElementById("signupForm");

    const button = form?.querySelector('button[type="submit"]');

    if (!button) {
      return;
    }

    button.disabled = !isSignupFormValid();
  }

  function updateSigninButton() {
    const form = document.getElementById("signinForm");

    const button = form?.querySelector('button[type="submit"]');

    if (!button) {
      return;
    }

    button.disabled = !isSigninFormValid();
  }

  /* =========================================
   SIGNUP INPUT EVENTS
========================================= */

  document
    .getElementById("signupForm")
    ?.querySelectorAll("input")
    .forEach((input) => {
      input.addEventListener("input", () => {
        validateSignupField(input);

        updateSignupButton();
      });

      input.addEventListener("blur", () => {
        validateSignupField(input);

        updateSignupButton();
      });
    });

  /* =========================================
   SIGNIN INPUT EVENTS
========================================= */

  document
    .getElementById("signinForm")
    ?.querySelectorAll("input")
    .forEach((input) => {
      input.addEventListener("input", () => {
        validateSigninField(input);

        updateSigninButton();
      });

      input.addEventListener("blur", () => {
        validateSigninField(input);

        updateSigninButton();
      });
    });

  /* =========================================
   INITIAL BUTTON STATE
========================================= */

  updateSignupButton();
  updateSigninButton();

  /* =====================================
       SIGN UP SUBMIT
    ====================================== */

  signupForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateSignup()) {
      return;
    }

    console.log("SIGN UP VALID");
  });

  /* =====================================
       SIGN IN SUBMIT
    ====================================== */

  signinForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateSignin()) {
      return;
    }

    console.log("SIGN IN VALID");
  });

  /* =====================================
       PASSWORD SHOW / HIDE
    ====================================== */

  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);

      if (!target) {
        return;
      }

      const show = target.type === "password";

      target.type = show ? "text" : "password";

      button.setAttribute(
        "aria-label",
        show ? "Hide password" : "Show password",
      );
    });
  });
});
