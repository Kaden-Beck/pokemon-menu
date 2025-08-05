import { getLocalStorage } from "./utilities.mjs";
import PokemonNutrients from "./PokemonNutrients";
import TypeData from "./TypeData.mjs";
// const baseURL = import.meta.env.POKEMON_ENDPOINT;


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class PokemonDetails {
    constructor(pokemonId) {
        this.pokemonId = pokemonId;
        this.endpointURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;
    }

    async init() {
        this.pokemon = await this.getPokemonData(this.endpointURL);
        this.flavorText = await this.getFlavorText();
        this.typeNames = this.getTypes();
        this.name = this.pokemon.name;
        this.weight = parseInt(this.pokemon.weight);
        this.spriteURL = this.pokemon.sprites.front_default;
        this.typeSprites = await this.buildTypeSprites(this.typeNames);
        const pokemonNutrients = new PokemonNutrients(this.pokemon);

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
        Types.forEach(typeData => {
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

        typeNames.forEach(typeName => {
            let type = typeData[typeName];
            typeSpriteHTML += `<img class="type-sprite" src="${type.spriteURL}" alt="Sprite of ${type.name}" height="20">`;
        });   

        return typeSpriteHTML;
    }

    renderPokemonDetails() {
        // Pokemon Name
        document.getElementById('p-name').textContent = this.name.charAt(0).toUpperCase() + this.name.slice(1); 
        // Pokemon Sprite
        const pokemonSprite = document.getElementById('p-sprite');
        pokemonSprite.src = this.spriteURL;
        pokemonSprite.alt = 'sprite of ' + this.name;
        // Build type sprites
        document.getElementById('p-types').innerHTML = this.typeSprites
        document.getElementById('flavor-text').textContent = this.flavorText;
        // Build pokemon nutrient data
        
    }
}

