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
        // this.types = await this.getTypes(this.pokemon.types);
        this.name = this.pokemon.name;
        this.weight = parseInt(this.pokemon.weight);
        this.spriteURL = this.pokemon.sprites.front_default;
        console.log(this.spriteURL)
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

    getTypes(Types) {
        let types = {};
        Types.forEach(typeData => {
            let typeName = typeData.type.name;
            types.push(typeName);
        });

        return types;
    }

    // Function to display sprites of pokemons types
    async buildTypeSprites(types) {
        const typeData = new TypeData();
        let typeSprites = ``;
        types.forEach(typeData => {
            let typeInfo = typeData.getTypeByName(typeData);
            let typeSprites = `<img 
                src="${typeInfo.spriteURL}" 
                alt="Sprite of ${typeInfo.name}" 
                height="40">`;
            typeSprites += typeSprites;
        });   
        return typeSprites;
    }

    async renderPokemonDetails() {
        document.getElementById('p-name').textContent = this.name.charAt(0).toUpperCase() + this.name.slice(1); 
        
        // Build type sprites
        const pokemonSprite = document.getElementById('p-sprite');
        pokemonSprite.src = this.spriteURL;
        pokemonSprite.alt = 'sprite of ' + this.name;

        document.getElementById('flavor-text').textContent = this.flavorText;
        // Build pokemon nutrient data
    }
}

