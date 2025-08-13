import img from "./assets/Food.png";
import logo from "./assets/Sooubway.jpg";

const HomePage = {
  init() {
    this.cacheDom();
    this.render();
    this.addEventListeners();
  },

  cacheDom() {
    this.mainContent = document.querySelector("#content");
    this.navBtn = document.querySelector("#homeBtn");
  },

  createEl(tag, className = null) {
    const el = document.createElement(tag);
    if (className) {
      className.split(" ").forEach((cls) => el.classList.add(cls));
    }
    return el;
  },

  addEventListeners() {
    // Add click event to promo codes
    const promoCodes = document.querySelectorAll(".promo-code");
    promoCodes.forEach((code) => {
      code.addEventListener("click", () => {
        this.copyPromoCode(code);
      });
    });

    // Add scroll animations
    this.addScrollAnimations();
  },

  copyPromoCode(element) {
    const codeText = element.querySelector("strong")?.textContent;
    if (codeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        this.showToast(`Copied ${codeText} to clipboard!`);
        element.style.transform = "scale(1.05)";
        setTimeout(() => {
          element.style.transform = "scale(1)";
        }, 200);
      });
    }
  },

  showToast(message) {
    const toast = this.createEl("div", "toast");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-green);
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  },

  addScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".feature-card, .promo-code, .cta-section"
    );
    elements.forEach((el) => observer.observe(el));
  },

  render() {
    // Clear previous content
    this.mainContent.innerHTML = "";
    document
      .querySelectorAll("nav button")
      .forEach((btn) => btn.classList.remove("buttonClicked"));
    this.navBtn.classList.add("buttonClicked");

    const logoContainer = document.querySelector("#logo");
    logoContainer.innerHTML = "";

    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";
    logoContainer.appendChild(logoImg);

    // Main container
    this.container = this.createEl("div", "home fade-in-up");
    this.mainContent.appendChild(this.container);

    // Title
    this.title = this.createEl("h2");
    this.title.textContent = "Welcome to SooubWay!";
    this.container.appendChild(this.title);

    // Description
    this.description = this.createEl("p");
    this.description.textContent =
      "Experience the perfect blend of fresh ingredients, bold flavors, and exceptional service. Every bite tells a story of quality and passion.";
    this.container.appendChild(this.description);

    // Hero Image with container
    this.heroContainer = this.createEl("div", "hero-image-container");
    this.image = this.createEl("img", "main-food-img");
    this.image.src = img;
    this.image.alt = "Delicious fresh food from SooubWay";
    this.heroContainer.appendChild(this.image);
    this.container.appendChild(this.heroContainer);

    // Features Section
    this.featuresSection = this.createEl("div", "features-section");
    this.featuresSection.innerHTML = `
      <div class="feature-card slide-in-left">
        <span class="feature-icon">🥪</span>
        <h4 class="feature-title">Fresh Ingredients</h4>
        <p class="feature-description">We use only the freshest, highest-quality ingredients in every sandwich.</p>
      </div>
      <div class="feature-card slide-in-left">
        <span class="feature-icon">⚡</span>
        <h4 class="feature-title">Fast Service</h4>
        <p class="feature-description">Get your delicious meal in minutes with our efficient service.</p>
      </div>
      <div class="feature-card slide-in-left">
        <span class="feature-icon">🌟</span>
        <h4 class="feature-title">Quality Assured</h4>
        <p class="feature-description">Every item is carefully prepared to meet our high standards.</p>
      </div>
    `;
    this.container.appendChild(this.featuresSection);

    // Promo Codes Section
    this.promoSection = this.createEl("div", "promo-section");
    this.promoSection.innerHTML = `
      <h3>Today's Special Offers</h3>
      <div class="promo-codes-grid">
        <div class="promo-code">
          Use code <strong>SOOUB10</strong> for 10% off your entire order!
        </div>
        <div class="promo-code">
          Use code <strong>FREECHIPS</strong> for free chips with any sandwich!
        </div>
        <div class="promo-code">
          Use code <strong>LUNCH50</strong> for 50% off your second item!
        </div>
      </div>
    `;
    this.container.appendChild(this.promoSection);

    // CTA Section
    this.ctaSection = this.createEl("div", "cta-section");
    this.ctaSection.innerHTML = `
      <h3>Ready to Taste the Difference?</h3>
      <p>Join thousands of satisfied customers who choose SooubWay for their daily meals.</p>
      <button class="cta-button" onclick="document.getElementById('menuBtn').click()">
        Explore Our Menu
      </button>
    `;
    this.container.appendChild(this.ctaSection);

    // Add CSS for toast animations
    this.addToastStyles();
  },

  addToastStyles() {
    if (!document.getElementById("toast-styles")) {
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  },
};

export default HomePage;
