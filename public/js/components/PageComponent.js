import Component from "./Component.js";

class PageComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="img/logo.png" alt="Beringar Pokémons Logo" class="menu__logo" />
          <span class="fs-4">Beringar Pokémon Page</span>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">My Pokemons</a></li>
        </ul>
      </div>
    </div>
  </header>
    `;
  }
}

export default PageComponent;
