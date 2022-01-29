import MenuItemComponent from "./MenuItemComponent.js";

describe("Given a MenuItemComponent component", () => {
  describe("When it's rendered", () => {
    test("Then it should render a li", () => {
      const expectedtagName = "LI";
      const menuItem = new MenuItemComponent("", "");
      const menuItemTagName = menuItem.element.tagName;
      expect(menuItemTagName).toBe(expectedtagName);
    });
  });

  describe("When it's rendered", () => {
    test("Then it should render 1 a element inside", () => {
      const expectedNumberOfLinks = 1;
      const menuItem = new MenuItemComponent("", "");
      const numberOfGeneratedLinks =
        menuItem.element.querySelectorAll("a").length;
      expect(numberOfGeneratedLinks).toBe(expectedNumberOfLinks);
    });
  });

  describe("When it receives 'La página de Paco' as text", () => {
    test("Then it should render a li element with 1 a element with the text 'La página de Paco'", () => {
      const text = "La página de Paco";
      const menuItem = new MenuItemComponent(text, "");
      const menuItemText = menuItem.element.querySelector("a").textContent;
      expect(menuItemText).toBe(text);
    });
  });

  describe("When it receives 'https://www.google.com' as url", () => {
    test("Then it should render a li element with 1 a element with the href attribute 'https://www.google.com'", () => {
      const url = "https://www.google.com";
      const expectedUrl = `${url}/`;
      const menuItem = new MenuItemComponent("", url);
      const menuItemUrl = menuItem.element.querySelector("a").href;
      expect(menuItemUrl).toBe(expectedUrl);
    });
  });
});
