import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";
import PokemonCardComponent from "./PokemonCardComponent.js";

class PageComponent extends Component {
  pokemons;
  nextPageEndPoint = "https://pokeapi.co/api/v2/pokemon?limit=18&offset=0";
  previousPageEndPoint = null;
  pokemonsCount;
  pokemonsPerPage = 18;
  currentOffset;

  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
        <div class="mb-2 btn-group" role="group" aria-label="Basic example">
          <button type="button" class="previous-page-button btn btn-primary">Previous page</button>
          <button type="button" class="page-count-button btn btn-warning"></button>
          <button type="button" class="next-page-button btn btn-primary">Next page</button>
        </div>
        <section class="pokemons-album row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </div>
      </div>
    </main>
    `;
    this.renderMenu();
    this.getPokemons(this.nextPageEndPoint);
    this.addListeners();
  }

  renderMenu() {
    const headerElement = this.element.querySelector(".header");
    const homePageMenuItem = new MenuItemComponent("Home", "/", true);
    const myPokemonsMenuItem = new MenuItemComponent("My Pokemons", "/", false);
    new MenuComponent(headerElement, [homePageMenuItem, myPokemonsMenuItem]);
  }

  renderPokemons(pokemons) {
    const pokemonsContainer = this.element.querySelector(".pokemons-album");
    pokemonsContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
      new PokemonCardComponent(
        pokemonsContainer,
        pokemon,
        () => null,
        () => null
      );
    });
  }

  async getPokemons(endpointURL) {
    if (endpointURL === null) return;
    const pokemonsEndpoints = await fetch(endpointURL)
      .then((response) => response.json())
      .then((data) => {
        this.nextPageEndPoint = data.next;
        this.previousPageEndPoint = data.previous;
        this.pokemonsCount = data.count;
        return data.results;
      });
    const pokemonsAllpromise = Promise.all(
      pokemonsEndpoints.map(({ url }) =>
        fetch(url).then((response) => response.json())
      )
    );
    this.pokemons = await pokemonsAllpromise;
    this.renderPokemons(this.pokemons);
    this.updatePageNavigation();
  }

  addListeners() {
    const previousPageButton = this.element.querySelector(
      ".previous-page-button"
    );
    const nextPageButton = this.element.querySelector(".next-page-button");
    previousPageButton.addEventListener("click", () =>
      this.getPokemons(this.previousPageEndPoint)
    );
    // BUGFIX: when in last page offset is passed to endpoint with a different value!
    // TODO: fix issue
    nextPageButton.addEventListener("click", () =>
      this.getPokemons(this.nextPageEndPoint)
    );
  }

  updatePageNavigation() {
    const previousPageButton = this.element.querySelector(
      ".previous-page-button"
    );
    const nextPageButton = this.element.querySelector(".next-page-button");
    const pageCountElement = this.element.querySelector(".page-count-button");
    if (this.previousPageEndPoint === null) {
      previousPageButton.disabled = true;
    } else {
      previousPageButton.disabled = false;
    }
    if (this.nextPageEndPoint === null) {
      nextPageButton.disabled = true;
    } else {
      nextPageButton.disabled = false;
    }
    if (this.nextPageEndPoint !== null) {
      const paramString = this.nextPageEndPoint.split("?")[1];
      const queryString = new URLSearchParams(paramString);
      // const limit = queryString.get("limit");
      this.currentOffset = queryString.get("offset");
    }
    const currentPageNumber = this.nextPageEndPoint
      ? Math.ceil(this.currentOffset / this.pokemonsPerPage)
      : this.currentOffset / this.pokemonsPerPage + 1;
    const totalPages = Math.ceil(this.pokemonsCount / this.pokemonsPerPage);
    pageCountElement.textContent = `page ${currentPageNumber} of ${totalPages}`;
  }
}

export default PageComponent;
