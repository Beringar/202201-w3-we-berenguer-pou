import Component from "./Component.js";

class PokemonCardComponent extends Component {
  pokemon;
  actionOnClick1;
  actionOnClick2;

  constructor(parentElement, pokemon, actionOnClick1, actionOnClick2) {
    super(parentElement, "pokemon-card col", "article");

    this.pokemon = pokemon;
    this.actionOnClick1 = actionOnClick1;
    this.actionOnClick2 = actionOnClick2;

    this.generateHTML();

    this.addListeners();
  }

  generateHTML() {
    this.element.innerHTML = `
  <div class="card shadow-sm">
    <svg
      class="bd-placeholder-img card-img-top"
      width="100%"
      height="225"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: Thumbnail"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#55595c" />
      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
        Thumbnail
      </text>
    </svg>

    <div class="card-body">
      <h5 class="card-title">${this.pokemon.name}</h5>
      <p class="card-text">
        Pokemon description , bla, bla....
      </p>
      <p class="text-muted text-end">extra data...</p>
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
