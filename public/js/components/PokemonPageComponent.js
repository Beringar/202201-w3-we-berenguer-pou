import Component from "./Component.js";
import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";

class PokemonPageComponent extends Component {
  lastAction;

  constructor(parentElement) {
    super(parentElement, "page");
    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="header p-3 bg-dark text-white"></header>
    <main class="main py-5 bg-light">
      <div class="container">
      <h1>detail page... working on it</h1>
      </div>
    </main>
    `;
    this.renderMenu();
  }

  renderMenu() {
    const headerElement = this.element.querySelector(".header");
    const homePageMenuItem = new MenuItemComponent("Home", "/", true);
    const myPokemonsMenuItem = new MenuItemComponent(
      "My Pokemons",
      "/mypokemons",
      false
    );
    new MenuComponent(headerElement, [homePageMenuItem, myPokemonsMenuItem]);
  }

  async handlePokemons(api) {
    if (api === "pokeAPI") {
      this.getPokeAPIpokemons(this.nextPageEndPoint);
    } else {
      this.getMyAPIpokemons("http://localhost:4000/pokemon");
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

  /* renderPokemons(pokemons, currentAPI) {
    const pokemonsContainer = this.element.querySelector(".pokemons-album");
    pokemonsContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
      const pokemonCard = new PokemonCardComponent(pokemonsContainer, pokemon);
      const pokemonCardButtonsContainer =
        pokemonCard.element.querySelector(".btn-group");
      if (currentAPI === "pokeAPI") {
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-outline-secondary",
          "View",
          () =>
            window.location.assign(
              `./pokemon/${pokemon.id}?api=${this.currentAPI}`
            )
        );
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-outline-secondary",
          "Add to myPokemons",
          () => this.addPokemonToCollection(pokemon)
        );
      } else {
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-outline-secondary",
          "View / Edit",
          () =>
            window.location.assign(
              `./pokemon/${pokemon.id}?api=${this.currentAPI}`
            )
        );
        new ButtonComponent(
          pokemonCardButtonsContainer,
          "poke-card__button btn btn-sm btn-outline-secondary",
          "Remove from myPokemons",
          () => null
        );
      }
    });
  } */

  async removePokemonFromCollection(pokemonID) {
    this.lastaction = await fetch(
      `http://localhost:4000/pokemon/${pokemonID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((json) => json);
  }
}

export default PokemonPageComponent;
