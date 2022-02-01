import PokemonCardComponent from "./PokemonCardComponent.js";

describe("Given a PokemonCardComponent component", () => {
  describe("When it's rendered", () => {
    test("Then it should render an article button", () => {
      const container = document.createElement("div");
      new PokemonCardComponent(
        container,
        {
          name: "Pedro",
          sprites: { other: { "official-artwork": { front_default: null } } },
        },
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
        {
          name: "Antonio Mastroiani",
          sprites: { other: { "official-artwork": { front_default: null } } },
        },
        () => null,
        () => null
      );
      expect(pokemonCard.element.textContent).toMatch(expectedText);
    });
  });
});
