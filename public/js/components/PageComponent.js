import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";
import PokemonCardComponent from "./PokemonCardComponent.js";

class PageComponent extends Component {
  pokemons;

  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
        <section class="pokemons-album row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </div>
      </div>
    </main>
    `;
    this.renderMenu();
    this.getPokemons();
  }

  renderMenu() {
    const headerElement = this.element.querySelector(".header");
    const homePageMenuItem = new MenuItemComponent("Home", "/", true);
    const myPokemonsMenuItem = new MenuItemComponent("My Pokemons", "/", false);
    new MenuComponent(headerElement, [homePageMenuItem, myPokemonsMenuItem]);
  }

  renderPokemons(pokemons) {
    const pokemonsContainer = this.element.querySelector(".pokemons-album");
    pokemons.forEach((pokemon) => {
      new PokemonCardComponent(
        pokemonsContainer,
        pokemon,
        () => null,
        () => null
      );
    });
  }

  async getPokemons() {
    const endpointURL = "https://pokeapi.co/api/v2/pokemon?limit=18";
    const pokemonsEndpoints = await fetch(endpointURL)
      .then((response) => response.json())
      .then((data) => data.results);
    const pokemonsAllpromise = Promise.all(
      pokemonsEndpoints.map(({ url }) =>
        fetch(url).then((response) => response.json())
      )
    );
    this.pokemons = await pokemonsAllpromise;
    this.renderPokemons(this.pokemons);
  }
}

export default PageComponent;
