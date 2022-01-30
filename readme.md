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
