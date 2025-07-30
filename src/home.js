import img from "./assets/Food.png";
import logo from "./assets/Sooubway.jpg";

const HomePage = {
  init() {
    this.cacheDom();
    this.render();
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

  render() {
    // Clear previous content
    this.mainContent.innerHTML = "";
    document
      .querySelectorAll("nav button")
      .forEach((btn) => btn.classList.remove("buttonClicked"));
    this.navBtn.classList.add("buttonClicked");

    const logoContainer = document.querySelector("#logo");
    logoContainer.innerHTML = ""; // Clear existing content if needed

    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";

    logoContainer.appendChild(logoImg);

    // Main container
    this.container = this.createEl("div", "home");
    this.mainContent.appendChild(this.container);

    // Title
    this.title = this.createEl("h2");
    this.title.textContent = "Welcome to SooubWay!";
    this.container.appendChild(this.title);

    // Description
    this.description = this.createEl("p");
    this.description.textContent =
      "Your favorite place for delicious sandwiches.";
    this.container.appendChild(this.description);

    // Image
    this.image = this.createEl("img", "main-food-img");
    this.image.src = img;
    this.image.alt = "Delicious food";
    this.container.appendChild(this.image);

    // Promo Codes Section
    this.promoSection = this.createEl("div", "promo-section");
    this.promoSection.innerHTML = `
      <h3>Today's Promo Codes</h3>
      <div class="promo-code">Use code <strong>SOOUB10</strong> for 10% off!</div>
      <div class="promo-code">Use code <strong>FREECHIPS</strong> for free chips!</div>
      <div class="promo-code">Use code <strong>LUNCH50</strong> for 50% off second item!</div>
    `;
    this.container.appendChild(this.promoSection);
  },
};

export default HomePage;
