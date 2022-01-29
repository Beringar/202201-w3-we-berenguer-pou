import MenuComponent from "./MenuComponent.js";
import MenuItemComponent from "./MenuItemComponent.js";

describe("Given a MenuComponent component", () => {
  describe("When it's rendered", () => {
    test("Then it should render a div", () => {
      const container = document.createElement("div");
      const menu = new MenuComponent(container, []);

      expect(container.querySelector("div")).not.toBeNull();
    });
  });

  describe("When it receives 3 menu items", () => {
    test("Then it should display 3 menu items inside", () => {
      const container = document.createElement("div");
      const menuItem1 = new MenuItemComponent("Paco", "http://paco.org", false);
      const menuItem2 = new MenuItemComponent(
        "Home page",
        "http://galletasmaria.org",
        true
      );
      const menuItem3 = new MenuItemComponent("Luis", "http://luis.net", false);
      const expectedNumberOfMenuItems = 3;
      const menuItem = new MenuComponent(container, [
        menuItem1,
        menuItem2,
        menuItem3,
      ]);
      const numberOfMenuItems = menuItem.element.querySelectorAll("li").length;
      expect(numberOfMenuItems).toBe(expectedNumberOfMenuItems);
    });
  });
});
