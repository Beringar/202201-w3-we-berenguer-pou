import ButtonComponent from "./ButtonComponent.js";
import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";
import PokemonDetailComponent from "./PokemonDetailComponent.js";

class PokemonPageComponent extends Component {
  pokemon;
  currentAPI;
  queryId;
  lastAction;

  constructor(parentElement) {
    super(parentElement, "page");

    this.getRequestParams();
    this.generateHTML();
  }

  getRequestParams() {
    const paramString = window.location.search;
    const queryString = new URLSearchParams(paramString);
    this.currentAPI = queryString.get("api");
    this.queryId = queryString.get("id");
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
    </main>
    `;
    this.renderMenu();
    this.handlePokemon(this.currentAPI);
    // this.renderPokemonInfo;
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

  async handlePokemon(api) {
    if (api === "pokeAPI") {
      this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.queryId}`);
    } else {
      this.getPokemon(
        `https://mypokeapi.herokuapp.com/pokemon/${this.queryId}`
      );
    }
  }

  async getPokemon(endpointURL) {
    if (endpointURL === null) return;
    this.pokemon = await fetch(endpointURL).then((response) => response.json());

    this.renderPokemon(this.pokemon, this.currentAPI);
  }

  renderPokemon(pokemon, currentAPI) {
    const pokemonContainer = this.element.querySelector(".main");
    const pokemonDetail = new PokemonDetailComponent(pokemonContainer, pokemon);
    const pokemonCardButtonsContainer =
      pokemonDetail.element.querySelector(".btn-group");
    if (currentAPI === "pokeAPI") {
      new ButtonComponent(
        pokemonCardButtonsContainer,
        "poke-card__button btn btn-sm btn-secondary",
        "Back to gallery view",
        () => window.location.assign("./")
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
        "Back to gallery view",
        () => window.location.assign("./mypokemons.html")
      );
      new ButtonComponent(
        pokemonCardButtonsContainer,
        "poke-card__button btn btn-sm btn-dark",
        "Remove from myPokemons",
        () => this.removePokemonFromCollection(pokemon.id)
      );
    }
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
    window.location.assign("./mypokemons.html");
  }
}

export default PokemonPageComponent;
