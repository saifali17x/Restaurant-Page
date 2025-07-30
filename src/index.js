import "./css/styles.css";
import "./css/home.css";
import "./css/menu.css";
import "./css/contact.css";

import HomePage from "./home.js";
import MenuPage from "./menu.js";
import renderContact from "./contact.js";
const Index = {
  init() {
    this.cacheDom();
    this.addEvents();
    this.resetActiveStates();
    this.homeBtn.classList.add("buttonClicked");
    HomePage.init();
  },

  cacheDom() {
    this.homeBtn = document.querySelector("#homeBtn");
    this.menuBtn = document.querySelector("#menuBtn");
    this.contactBtn = document.querySelector("#contactBtn");
  },

  addEvents() {
    this.homeBtn.addEventListener("click", () => {
      this.resetActiveStates();
      this.homeBtn.classList.add("buttonClicked");
      HomePage.init();
    });

    this.menuBtn.addEventListener("click", () => {
      this.resetActiveStates();
      this.menuBtn.classList.add("buttonClicked");
      MenuPage.init();
    });

    this.contactBtn.addEventListener("click", () => {
      this.resetActiveStates();
      this.contactBtn.classList.add("buttonClicked");
      renderContact(); // ✅ correct usage
    });
  },

  resetActiveStates() {
    this.homeBtn.classList.remove("buttonClicked");
    this.menuBtn.classList.remove("buttonClicked");
    this.contactBtn.classList.remove("buttonClicked");
  },
};

Index.init();
