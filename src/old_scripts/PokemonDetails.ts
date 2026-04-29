import { getLocalStorage } from '../utilities.js';
import PokemonNutrients from '../PokemonNutrients.js';
import TypeData from '../TypeData.js';
// const baseURL = import.meta.env.POKEMON_ENDPOINT;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export interface PokemonDetails_ {
  pokemonId: string;
  endpointURL: string;
  pokemon: unknown;
}

export default class PokemonDetails {
  constructor(pokemonId: string) {
    this.pokemonId = pokemonId;
    this.endpointURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;
  }

  async init() {
    this.pokemon = await this.getPokemonData(this.endpointURL);
    this.flavorText = await this.getFlavorText();
    this.typeNames = this.getTypes();
    this.name = this.pokemon.name;
    // Weight is provided in Hectograms
    this.spriteURL = this.pokemon.sprites.front_default;
    this.pokedexURL = 'https://www.pokemon.com/us/pokedex/' + this.name;
    this.typeSprites = await this.buildTypeSprites(this.typeNames);
    this.nutritionInformation = await this.buildNutrientInformation();

    this.renderPokemonDetails();
  }

  async getPokemonData(URL) {
    const response = await fetch(URL);
    const pokemonData = await convertToJson(response);
    return pokemonData;
  }

  async getFlavorText() {
    const response = await fetch(this.pokemon.species.url);
    const speciesData = await convertToJson(response);
    let flavorText = speciesData.flavor_text_entries[1].flavor_text;

    return flavorText;
  }

  getTypes() {
    let Types = this.pokemon.types;
    let typeNames = [];
    Types.forEach((typeData) => {
      let typeName = typeData.type.name;
      typeNames.push(typeName);
    });
    return typeNames;
  }

  // Function to display sprites of pokemons types
  async buildTypeSprites(typeNames) {
    const t = new TypeData();
    await t.init();
    const typeData = getLocalStorage('typeInfo');
    let typeSpriteHTML = [];

    typeNames.forEach((typeName) => {
      let type = typeData[typeName];
      typeSpriteHTML += `<img class="type-sprite hover-zoom" src="${type.spriteURL}" alt="Sprite of ${type.name}" height="20">`;
    });

    return typeSpriteHTML;
  }

  async buildNutrientInformation() {
    const pokemonNutrients = new PokemonNutrients(this.pokemon, this.typeNames);
    pokemonNutrients.init();

    return await pokemonNutrients.buildPokemonNutrients();
  }

  linkToPokedex(element) {
    element.addEventListener('click', () => {
      window.open(this.pokedexURL, '_blank');
    });
  }

  renderPokemonDetails() {
    // Pokemon Name
    const nameElement = document.getElementById('p-name');
    nameElement.textContent = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.linkToPokedex(nameElement);
    // Pokemon Sprite
    const pokemonSprite = document.getElementById('p-sprite');
    pokemonSprite.src = this.spriteURL;
    pokemonSprite.alt = 'sprite of ' + this.name;
    pokemonSprite.class = 'hover-spin';
    this.linkToPokedex(pokemonSprite);
    // Build type sprites
    document.getElementById('p-types').innerHTML = this.typeSprites;
    document.getElementById('flavor-text').textContent = this.flavorText;
    // Build pokemon nutrient data
    document.getElementById('nutrition-facts').innerHTML = this.nutritionInformation;
    // Get links for forward and back menu
    let previousPokemon = parseInt(this.pokemonId) - 1;
    document.getElementById('previous').href = '/pokemon/?pokemonID=' + previousPokemon;
    let nextPokemon = parseInt(this.pokemonId) + 1;
    document.getElementById('next').href = '/pokemon/?pokemonID=' + nextPokemon;
  }
}
