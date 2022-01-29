class Component {
  element;

  constructor(parentElement, className, htmlTag = "div") {
    this.element = document.createElement(htmlTag);
    this.element.className = className;

    parentElement.append(this.element);
  }
}

export default Component;
