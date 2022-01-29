import Component from "./Component.js";

class MenuComponent extends Component {
  items;
  constructor(parentElement, menuItems) {
    super(parentElement, "menu container", "div");

    this.items = menuItems;

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="img/logo.png" alt="Beringar Pokémons Logo" class="menu__logo" />
          <span class="fs-4">Beringar Pokémon</span>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        </ul>
      </div>
    `;

    this.renderMenuItems(this.items);
  }

  renderMenuItems(items) {
    const navContainer = this.element.querySelector(".nav");
    items.forEach((item) => navContainer.append(item.element));
  }
}

export default MenuComponent;
