import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";

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
    const homePageMenuItem = new MenuItemComponent("Home", "/", true);
    const myPokemonsMenuItem = new MenuItemComponent(
      "My Pokemons",
      "/mypokemons.html",
      false
    );
    new MenuComponent(headerElement, [homePageMenuItem, myPokemonsMenuItem]);
  }
}

export default PageComponent;
