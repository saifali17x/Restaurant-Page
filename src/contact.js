import logo from "./assets/Sooubway.jpg";

const contactPage = {
  init() {
    this.cacheDom();
    this.render();
    this.addEventListeners();
  },

  cacheDom() {
    this.mainContent = document.querySelector("#content");
    this.navBtn = document.querySelector("#contactBtn");
  },

  createEl(tag, className = null) {
    const el = document.createElement(tag);
    if (className) {
      className.split(" ").forEach((cls) => el.classList.add(cls));
    }
    return el;
  },

  addEventListeners() {
    // Form submission
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleFormSubmission();
      });
    }

    // Real-time validation
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });

    // Form field focus effects
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        this.addFocusEffect(input);
      });
    });
  },

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.id;
    let isValid = true;
    let errorMessage = "";

    // Remove existing error state
    this.clearFieldError(field);

    // Validation rules
    switch (fieldName) {
      case "name":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters long";
        }
        break;
      case "surname":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "Surname must be at least 2 characters long";
        }
        break;
      case "user_email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "user_msg":
        if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters long";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  },

  showFieldError(field, message) {
    const fieldContainer = field.parentElement;
    fieldContainer.classList.add("error");

    const errorEl = this.createEl("div", "error-message");
    errorEl.textContent = message;
    fieldContainer.appendChild(errorEl);
  },

  clearFieldError(field) {
    const fieldContainer = field.parentElement;
    fieldContainer.classList.remove("error");

    const existingError = fieldContainer.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  },

  addFocusEffect(field) {
    field.style.transform = "scale(1.02)";
    setTimeout(() => {
      field.style.transform = "scale(1)";
    }, 200);
  },

  validateForm() {
    const inputs = document.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  async handleFormSubmission() {
    if (!this.validateForm()) {
      this.showToast("Please fix the errors in the form", "error");
      return;
    }

    const form = document.querySelector(".form");
    form.classList.add("loading");

    // Simulate form submission
    try {
      await this.simulateSubmission();

      this.showSuccessMessage();
      this.resetForm();
      this.showToast("Message sent successfully!", "success");
    } catch (error) {
      this.showToast("Failed to send message. Please try again.", "error");
    } finally {
      form.classList.remove("loading");
    }
  },

  simulateSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  },

  showSuccessMessage() {
    const successMessage = this.createEl("div", "success-message");
    successMessage.innerHTML = `
      <h3>🎉 Message Sent Successfully!</h3>
      <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
    `;

    const form = document.querySelector(".form");
    form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  },

  resetForm() {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.value = "";
      this.clearFieldError(input);
    });
  },

  showToast(message, type = "info") {
    const toast = this.createEl("div", "toast");
    toast.textContent = message;

    const bgColor =
      type === "success"
        ? "var(--primary-green)"
        : type === "error"
        ? "var(--accent-red)"
        : "var(--gray-600)";

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  },

  render() {
    this.mainContent.innerHTML = "";
    document
      .querySelectorAll("nav button")
      .forEach((btn) => btn.classList.remove("buttonClicked"));
    if (this.navBtn) this.navBtn.classList.add("buttonClicked");

    // Logo
    const logoContainer = document.querySelector("#logo");
    logoContainer.innerHTML = "";

    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";
    logoContainer.appendChild(logoImg);

    // Main container
    this.container = this.createEl("div", "contact");

    // Title
    this.title = this.createEl("h2");
    this.title.textContent = "Get in Touch";

    // Subtitle
    this.subtitle = this.createEl("p", "contact-subtitle");
    this.subtitle.textContent =
      "Have a question, feedback, or want to place an order? We'd love to hear from you. Send us a message and we'll respond as soon as possible.";

    // Contact content container
    this.contactContent = this.createEl("div", "contact-content");

    // Form section
    this.form = this.createEl("div", "form");

    // Name input group
    this.divName = this.createEl("div");
    this.labelName = document.createElement("label");
    this.labelName.setAttribute("for", "name");
    this.inputName = document.createElement("input");
    this.inputName.type = "text";
    this.inputName.id = "name";
    this.inputName.placeholder = "Enter your first name";

    // Surname input group
    this.divSurname = this.createEl("div");
    this.labelSurname = document.createElement("label");
    this.labelSurname.setAttribute("for", "surname");
    this.inputSurname = document.createElement("input");
    this.inputSurname.type = "text";
    this.inputSurname.id = "surname";
    this.inputSurname.placeholder = "Enter your last name";

    // Email input group
    this.divEmail = this.createEl("div");
    this.labelEmail = document.createElement("label");
    this.labelEmail.setAttribute("for", "user_email");
    this.inputEmail = document.createElement("input");
    this.inputEmail.type = "email";
    this.inputEmail.id = "user_email";
    this.inputEmail.placeholder = "Enter your email address";

    // Message input group
    this.divMsg = this.createEl("div");
    this.labelMsg = document.createElement("label");
    this.labelMsg.setAttribute("for", "user_msg");
    this.msg = document.createElement("textarea");
    this.msg.id = "user_msg";
    this.msg.placeholder = "Tell us how we can help you...";

    // Submit button
    this.submitBtn = document.createElement("button");
    this.submitBtn.type = "button";
    this.submitBtn.classList.add("submit-btn");

    // Contact info section
    this.contactInfo = this.createEl("div", "contact-info");
    this.contactInfo.innerHTML = `
      <h3>Contact Information</h3>
      <div class="contact-method">
        <div class="contact-icon">📧</div>
        <div class="contact-details">
          <h4>Email</h4>
          <p>saifalisalman4@gmail.com</p>
        </div>
      </div>
      <div class="contact-method">
        <div class="contact-icon">📍</div>
        <div class="contact-details">
          <h4>Location</h4>
          <p>123 Food Street, Cuisine City</p>
        </div>
      </div>
      <div class="contact-method">
        <div class="contact-icon">🕒</div>
        <div class="contact-details">
          <h4>Hours</h4>
          <p>Mon-Sat: 8AM-10PM<br>Sunday: 10AM-8PM</p>
        </div>
      </div>
      <div class="contact-method">
        <div class="contact-icon">📱</div>
        <div class="contact-details">
          <h4>Phone</h4>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    `;

    // Professional restaurant image from internet
    this.sideImg = document.createElement("img");
    this.sideImg.src =
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    this.sideImg.alt =
      "Professional restaurant interior with warm lighting and welcoming atmosphere";
    this.sideImg.classList.add("contactSideImg");

    this.textFillings();
    this.appending();
  },

  textFillings() {
    this.title.textContent = "Get in Touch";
    this.labelName.textContent = "First Name:";
    this.labelSurname.textContent = "Last Name:";
    this.labelEmail.textContent = "Email Address:";
    this.labelMsg.textContent = "Your Message:";
    this.submitBtn.textContent = "Send Message";
  },

  appending() {
    // Form elements
    this.divName.appendChild(this.labelName);
    this.divName.appendChild(this.inputName);

    this.divSurname.appendChild(this.labelSurname);
    this.divSurname.appendChild(this.inputSurname);

    this.divEmail.appendChild(this.labelEmail);
    this.divEmail.appendChild(this.inputEmail);

    this.divMsg.appendChild(this.labelMsg);
    this.divMsg.appendChild(this.msg);

    this.form.appendChild(this.divName);
    this.form.appendChild(this.divSurname);
    this.form.appendChild(this.divEmail);
    this.form.appendChild(this.divMsg);
    this.form.appendChild(this.submitBtn);

    // Contact content
    this.contactContent.appendChild(this.form);
    this.contactContent.appendChild(this.contactInfo);

    // Main container
    this.container.appendChild(this.title);
    this.container.appendChild(this.subtitle);
    this.container.appendChild(this.contactContent);
    this.container.appendChild(this.sideImg);

    this.mainContent.appendChild(this.container);
  },
};

export default function renderContact() {
  contactPage.init();
}
