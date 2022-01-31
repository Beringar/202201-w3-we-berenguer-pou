# Beringar Pokémons App

Configs: put here stack, tooling, etc...

## Development journal

1. Added Config development environment

- eslint
- eslint config prettier
- husky (hooks: pre-commit, pre-push, commit-msg)
- babel plugin to manage import/export --> commonJS
- jest and @types/jest
- sass
- bootstrap5
- github workflow audit.yml

2. setup folder structure
3. added scripts in package.json:

- "compile-sass": "sass src/scss/styles.scss public/css/styles.css"
- "compile-sass-watch": "sass --watch src/scss/styles.scss public/css/styles.css"

4. added Component component
5. added PageComponent component

- added basic html structure: header, main, footer

6. added MenuComponent component

- 2 tests OK.

7. added MenuItemComponent components

- 4 tests OK.

8. added PokemonCardComponent

- 3 tests OK.

9. implement get data from pokeAPI

10. implement paginated data fetching. OK

- BUGFIX: pagination when in last page, modifies offset value. Fix later, after CRUD

11. implement POST pokemon to mypokemonsAPI

- added function addPokemonToCollection
- passed action in button 1 when instantiate PokemonCard component --> addPokemonToCollection()

12. implemented ButtonComponent component to inject actions to cards conditionally (if main page(pokeapi), if mypokemons(myapi))

13. implemented removePokemonFromCollection in PageComponent component (if main page(pokeapi), if mypokemons(myapi))

14. added and deployed mipokeapi app to Heroku (api url: https://mypokeapi.herokuapp.com/)

- tested ok. GET, ADD, and DELETE methods are working.

15. added PokemonDetailComponent

- added form tu update Name and description (in PUT method)
