import Component from "./Component.js";

class PageComponent extends Component {
  constructor(parentElement) {
    super(parentElement, "page");

    this.generateHTML();
  }

  generateHTML() {
    this.element.innerHTML = `
    <div class="container"><h1>Page Component Testing</h1>
    </div>
    `;
  }
}

export default PageComponent;
