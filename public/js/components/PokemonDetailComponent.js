import Component from "./Component.js";

class PokemonDetailComponent extends Component {
  pokemon;
  pokemonImageUrl;

  constructor(parentElement, pokemon) {
    super(parentElement, "pokemon-card col", "article");
    this.pokemon = pokemon;
    this.pokemonImageUrl =
      this.pokemon.sprites.other["official-artwork"].front_default ??
      "https://www.fillmurray.com/g/475/475";

    this.generateHTML();
  }

  generateHTML() {
    this.element.dataset.id = this.pokemon.id;
    this.element.innerHTML = `
    <div class="container col-xxl-8 px-4">
      <div class="row flex-lg-row-reverse align-items-center g-5">
        <div class="col-10 col-md-6 col-sm-6 col-lg-6">
          <img
            src="${this.pokemonImageUrl}"
            class="d-block mx-lg-auto img-fluid"
            alt="${this.pokemon.name}"
            width="700"
            height="500"
            layout="responsive"
          />
        </div>
        <div class="col-6 col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">
            ${this.pokemon.name[0].toUpperCase()}${this.pokemon.name.slice(1)}
          </h1>
          <p class="lead">${
            this.pokemon.description ?? "custom description not defined"
          }</p>
          <ul class="pokemon-detail__grid">
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Base experience</span>
            <span class="pokemon-detail__value">${
              this.pokemon.base_experience ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Height</span>
            <span class="pokemon-detail__value">${
              this.pokemon.height
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Weight</span>
            <span class="pokemon-detail__value">${
              this.pokemon.weight
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Forms</span>
            <span class="pokemon-detail__value">${
              this.pokemon.forms.length
            } </span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Moves</span>
            <span class="pokemon-detail__value">${
              this.pokemon.moves.length
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">HP</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[0].base_stat ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Attack</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[1].base_stat ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Defense</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[2].base_stat ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Special attack</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[3].base_stat ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Special defense</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[4].base_stat ?? "not defined"
            }</span></li>
            <li class="pokemon-detail__grid__item"><span class="pokemon-detail__key">Speed</span>
            <span class="pokemon-detail__value">${
              this.pokemon.stats[5].base_stat ?? "not defined"
            }</span></li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group"></div>
      </div>
      <form class="pokemon-detail__form id="mypokeapi-form">
    <div class="mb-3">
      <label class="form-label" for="name_input">Name</label>
      <input class="form-control" id="name_input" type="text" placeholder="Name" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="description_input">Description</label>
      <textarea class="form-control" id="description_input" type="text" placeholder="Description" style="height: 10rem;"></textarea>
    </div>
    <div class="d-grid">
      <button id="submit_input" class="btn btn-primary btn-lg" type="submit">Submit</button>
    </div>
  </form>
  </div>
`;
  }
}

export default PokemonDetailComponent;
