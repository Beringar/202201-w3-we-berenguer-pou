import ButtonComponent from "./ButtonComponent.js";
import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";
import PokemonCardComponent from "./PokemonCardComponent.js";

class PageComponent extends Component {
  currentAPI = "pokeAPI";
  pokemons;
  nextPageEndPoint = "https://pokeapi.co/api/v2/pokemon?limit=18&offset=0";
  previousPageEndPoint = null;
  pokemonsCount;
  pokemonsPerPage = 18;
  currentOffset;
  lastAction = "none";

  constructor(parentElement) {
    super(parentElement, "page");
    this.setCurrentAPIbyPath();
    this.generateHTML(this.currentAPI);
  }

  setCurrentAPIbyPath() {
    this.currentAPI = window.location.pathname === "/" ? "pokeAPI" : "myAPI";
  }

  generateHTML(currentAPI) {
    this.element.innerHTML =
      currentAPI === "pokeAPI"
        ? `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
        <div class="mb-2 btn-group" role="group" aria-label="Page navigation">
          <button type="button" class="previous-page-button btn btn-primary">Previous page</button>
          <button type="button" class="page-count-button btn btn-warning"></button>
          <button type="button" class="next-page-button btn btn-primary">Next page</button>
        </div>
        <section class="pokemons-album row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </section>
      </div>
    </main>
    `
        : `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
        <section class="pokemons-album pokemons-album--mypokemons row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </section>
      </div>
    </main>
    `;
    this.renderMenu();
    this.handlePokemons(currentAPI);
    this.addListeners(currentAPI);
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

  async handlePokemons(api) {
    if (api === "pokeAPI") {
      this.getPokeAPIpokemons(this.nextPageEndPoint);
    } else {
      this.getMyAPIpokemons("https://mypokeapi.herokuapp.com/pokemon");
    }
  }

  async getPokeAPIpokemons(endpointURL) {
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
    this.renderPokemons(this.pokemons, this.currentAPI);
    this.updatePageNavigation();
  }

  async getMyAPIpokemons(endpointURL) {
    if (endpointURL === null) return;
    this.pokemons = await fetch(endpointURL).then((response) =>
      response.json()
    );
    //  this.nextPageEndPoint = data.next;
    //  this.previousPageEndPoint = data.previous;
    //  this.pokemonsCount = data.count;
    //  return data.results;

    this.renderPokemons(this.pokemons, this.currentAPI);
    // this.updatePageNavigation();
  }

  renderPokemons(pokemons, currentAPI) {
    const pokemonsContainer = this.element.querySelector(".pokemons-album");
    pokemonsContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
      const pokemonCard = new PokemonCardComponent(pokemonsContainer, pokemon);
      const pokemonCardButtonsContainer =
        pokemonCard.element.querySelector(".btn-group");
      if (currentAPI === "pokeAPI") {
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-secondary",
          "View",
          () =>
            window.location.assign(
              `./pokemon.html?id=${pokemon.id}&api=${this.currentAPI}`
            )
        );
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-dark",
          "Add to myPokemons",
          () => this.addPokemonToCollection(pokemon)
        );
      } else {
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-secondary",
          "View / Edit",
          () =>
            window.location.assign(
              `./pokemon.html?id=${pokemon.id}&api=${this.currentAPI}`
            )
        );
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-dark",
          "Remove from myPokemons",
          () => this.removePokemonFromCollection(pokemon.id)
        );
      }
    });
  }

  addListeners(currentAPI) {
    if (currentAPI === "pokeAPI") {
      const previousPageButton = this.element.querySelector(
        ".previous-page-button"
      );
      const nextPageButton = this.element.querySelector(".next-page-button");
      previousPageButton.addEventListener("click", () =>
        this.getPokeAPIpokemons(this.previousPageEndPoint)
      );
      // BUGFIX: when in last page offset is passed to endpoint with a different value!
      // TODO: fix issue
      nextPageButton.addEventListener("click", () =>
        this.getPokeAPIpokemons(this.nextPageEndPoint)
      );
    }
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
      this.currentOffset = queryString.get("offset");
    }
    const currentPageNumber = this.nextPageEndPoint
      ? Math.ceil(this.currentOffset / this.pokemonsPerPage)
      : this.currentOffset / this.pokemonsPerPage + 1;
    const totalPages = Math.ceil(this.pokemonsCount / this.pokemonsPerPage);
    pageCountElement.textContent = `page ${currentPageNumber} of ${totalPages}`;
  }

  async addPokemonToCollection(pokemon) {
    const pokemonToAdd = { ...pokemon };
    delete pokemonToAdd.id;
    this.lastAction = fetch("https://mypokeapi.herokuapp.com/pokemon", {
      method: "POST",
      body: JSON.stringify(pokemonToAdd),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => json);
  }

  async removePokemonFromCollection(pokemonID) {
    this.lastaction = await fetch(
      `https://mypokeapi.herokuapp.com/pokemon/${pokemonID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((json) => json);

    this.element.querySelector(`[data-id='${pokemonID}']`).remove();
  }
}

export default PageComponent;
