import Component from "./Component.js";

class PokemonCardComponent extends Component {
  pokemon;
  pokemonImageUrl;

  constructor(parentElement, pokemon) {
    super(parentElement, "pokemon-card col", "article");

    this.pokemon = pokemon;
    this.pokemonImageUrl =
      this.pokemon.sprites.other["official-artwork"].front_default ??
      "https://www.fillmurray.com/g/300/300";

    this.generateHTML();
  }

  generateHTML() {
    this.element.dataset.id = this.pokemon.id;
    this.element.innerHTML = `
  <div class="card shadow-sm">
    <img src="${this.pokemonImageUrl}" class="card-img-top" alt="${
      this.pokemon.name
    }">
    <div class="card-body">
      <h4 class="card-title">${this.pokemon.name[0].toUpperCase()}${this.pokemon.name.slice(
      1
    )}</h4>
      <p class="text-muted text-end">height: ${this.pokemon.height} weight: ${
      this.pokemon.weight
    }</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        </div>
      </div>
    </div>
  </div>
`;
  }
}

export default PokemonCardComponent;
