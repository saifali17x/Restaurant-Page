import img from "./assets/Food.png";
import logo from "./assets/Sooubway.jpg";

const contactPage = {
  init() {
    this.cacheDom();
    this.render();
    this.textFillings();
    this.appending();
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

  render() {
    this.mainContent.innerHTML = "";
    document
      .querySelectorAll("nav button")
      .forEach((btn) => btn.classList.remove("buttonClicked"));
    if (this.navBtn) this.navBtn.classList.add("buttonClicked");

    // Logo
    const logoContainer = document.querySelector("#logo");
    logoContainer.innerHTML = ""; // Clear existing content if needed

    const logoImg = this.createEl("img", "logo-img");
    logoImg.src = logo;
    logoImg.alt = "SooubWay Logo";

    logoContainer.appendChild(logoImg);

    // Main container
    this.container = this.createEl("div", "contact");

    // Title
    this.title = this.createEl("h2");

    // Form section
    this.form = this.createEl("div", "form");

    // Name input group
    this.divName = this.createEl("div");
    this.labelName = document.createElement("label");
    this.labelName.setAttribute("for", "name");
    this.inputName = document.createElement("input");
    this.inputName.type = "text";
    this.inputName.id = "name";

    // Surname input group
    this.divSurname = this.createEl("div");
    this.labelSurname = document.createElement("label");
    this.labelSurname.setAttribute("for", "surname");
    this.inputSurname = document.createElement("input");
    this.inputSurname.type = "text";
    this.inputSurname.id = "surname";

    // Email input group
    this.divEmail = this.createEl("div");
    this.labelEmail = document.createElement("label");
    this.labelEmail.setAttribute("for", "user_email");
    this.inputEmail = document.createElement("input");
    this.inputEmail.type = "email";
    this.inputEmail.id = "user_email";

    // Message input group
    this.divMsg = this.createEl("div");
    this.labelMsg = document.createElement("label");
    this.labelMsg.setAttribute("for", "user_msg");
    this.msg = document.createElement("textarea");
    this.msg.id = "user_msg";

    // Submit button
    this.submitBtn = document.createElement("button");

    // Side image
    this.sideImg = document.createElement("img");
    this.sideImg.src = img;
    this.sideImg.alt = "fries with some coca";
    this.sideImg.classList.add("contactSideImg");
  },

  textFillings() {
    this.title.textContent = "Contact Us";
    this.labelName.textContent = "Name:";
    this.labelSurname.textContent = "Surname:";
    this.labelEmail.textContent = "Your Email:";
    this.labelMsg.textContent = "Your Message:";
    this.submitBtn.textContent = "Submit";
  },

  appending() {
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

    this.container.appendChild(this.title);
    this.container.appendChild(this.form);
    this.container.appendChild(this.sideImg);

    this.mainContent.appendChild(this.container);
  },
};

export default function renderContact() {
  contactPage.init();
}
