import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";

class PageComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white">
  </header>
    `;
    this.renderMenu();
  }

  renderMenu() {
    const headerElement = this.element.querySelector(".header");
    new MenuComponent(headerElement);
  }
}

export default PageComponent;
