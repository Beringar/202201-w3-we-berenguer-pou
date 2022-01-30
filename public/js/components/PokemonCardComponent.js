import Component from "./Component.js";

class PokemonCardComponent extends Component {
  pokemon;
  actionOnClick1;
  actionOnClick2;
  pokemonImageUrl;

  constructor(parentElement, pokemon, actionOnClick1, actionOnClick2) {
    super(parentElement, "pokemon-card col", "article");

    this.pokemon = pokemon;
    this.actionOnClick1 = actionOnClick1;
    this.actionOnClick2 = actionOnClick2;
    this.pokemonImageUrl =
      this.pokemon.sprites.other["official-artwork"].front_default ??
      "https://www.fillmurray.com/g/300/300";

    this.generateHTML();

    this.addListeners();
  }

  generateHTML() {
    this.element.innerHTML = `
  <div class="card shadow-sm">
    <img src="${this.pokemonImageUrl}" class="card-img-top" alt="${
      this.pokemon.name
    }">
    <div class="card-body">
      <h5 class="card-title">${this.pokemon.name[0].toUpperCase()}${this.pokemon.name.slice(
      1
    )}</h5>
      <p class="card-text">
        Species: ${this.pokemon.species.name}
      </p>
      <p class="text-muted text-end">height: ${this.pokemon.height} weight: ${
      this.pokemon.weight
    }</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="poke-card__button-a btn btn-sm btn-outline-secondary">
            View
          </button>
          <button type="button" class="poke-card__button-b btn btn-sm btn-outline-secondary">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
`;
  }

  addListeners() {
    this.element
      .querySelector(".poke-card__button-a")
      .addEventListener("click", this.actionOnClick1);
    this.element
      .querySelector(".poke-card__button-b")
      .addEventListener("click", this.actionOnClick2);
  }
}

export default PokemonCardComponent;
