import Component from "./Component.js";

class MenuItemComponent extends Component {
  constructor(text, url, isCurrentPage) {
    const divParent = document.createElement("div");
    super(divParent, "menu__item", "li");

    this.generateHTML(text, url, isCurrentPage);
  }

  generateHTML(text, url, isCurrentPage) {
    const classToAddByPage = isCurrentPage
      ? "menu__item__link--current"
      : "menu__item__link";
    this.element.innerHTML = `
    <a href="${url}" class="nav-link px-2 ${classToAddByPage}">${text}</a>
    `;
  }
}

export default MenuItemComponent;
