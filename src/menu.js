import Panini from "./assets/Panini.png";
import Salads from "./assets/Salads.png";
import Sandwiches from "./assets/Sandwiches.png";
import Savors from "./assets/Savors.png";
import Sides from "./assets/Sides.png";
import logo from "./assets/Sooubway.jpg";

const MenuPage = {
  init() {
    this.cacheDom();
    this.render();
  },

  cacheDom() {
    this.mainContent = document.querySelector("#content");
    this.logoContainer = document.querySelector("#logo");
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
    this.logoContainer.innerHTML = "";

    // Create and append logo image
    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";
    this.logoContainer.appendChild(logoImg);

    // Menu layout
    const menuContainer = this.createEl("div", "menu-container");

    const heading = this.createEl("h2", "menu-heading");
    heading.textContent = "Our Delicious Menu";

    const menuGrid = this.createEl("div", "menu-grid");

    const menuItems = [
      { name: "Panini", image: Panini },
      { name: "Salads", image: Salads },
      { name: "Sandwiches", image: Sandwiches },
      { name: "Savors", image: Savors },
      { name: "Sides", image: Sides },
    ];

    menuItems.forEach((item) => {
      const card = this.createEl("div", "menu-item");

      const img = new Image();
      img.src = item.image;
      img.alt = item.name;
      img.classList.add("menu-img");

      const label = this.createEl("p", "menu-label");
      label.textContent = item.name;

      card.appendChild(img);
      card.appendChild(label);
      menuGrid.appendChild(card);
    });

    menuContainer.appendChild(heading);
    menuContainer.appendChild(menuGrid);

    this.mainContent.appendChild(menuContainer);
  },
};

export default MenuPage;
