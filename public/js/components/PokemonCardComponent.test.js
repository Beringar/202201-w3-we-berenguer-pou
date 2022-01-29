import PokemonCardComponent from "./PokemonCardComponent.js";

describe("Given a PokemonCardComponent component", () => {
  describe("When it's rendered", () => {
    test("Then it should render an article button", () => {
      const container = document.createElement("div");
      new PokemonCardComponent(
        container,
        { name: "" },
        () => null,
        () => null
      );
      expect(container.querySelector("article")).not.toBeNull();
    });
  });

  describe("When it receives {name:'Antonio Mastroiani'}", () => {
    test("Then it should show the text 'Antonio Mastroiani'", () => {
      const container = document.createElement("div");
      const object = { name: "Antonio Mastroiani" };
      const expectedText = object.name;
      const pokemonCard = new PokemonCardComponent(
        container,
        { name: "Antonio Mastroiani" },
        () => null,
        () => null
      );
      expect(pokemonCard.element.textContent).toMatch(expectedText);
    });
  });

  describe("When it receives two actions", () => {
    test("Then the  two actions should be invoked'", () => {
      const container = document.createElement("div");
      const actionA = jest.fn();
      const pokemonCard = new PokemonCardComponent(
        container,
        { name: "" },
        actionA,
        () => null
      );
      pokemonCard.element.querySelector(".poke-card__button-a").click();
      expect(actionA).toHaveBeenCalled();
    });
  });
});
