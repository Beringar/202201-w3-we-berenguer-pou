import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";
import PokemonCardComponent from "./PokemonCardComponent.js";

class PageComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
        <div class="pokemons-album row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </div>
      </div>
    </main>
    `;
    this.renderMenu();
    this.renderPokemons();
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

  renderPokemons() {
    const pokemonsContainer = this.element.querySelector(".pokemons-album");
    for (let i = 0; i < 20; i++) {
      new PokemonCardComponent(
        pokemonsContainer,
        { name: `Poke #${i}` },
        () => null,
        () => null
      );
    }
  }
}

export default PageComponent;
