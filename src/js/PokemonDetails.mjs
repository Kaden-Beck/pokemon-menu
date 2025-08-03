

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class PokemonData {
    constructor(pokemonId) {
        this.pokemonId = pokemonId;
        this.endpointURL = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`;
    }

    async init() {
        this.pokemonData = await getPokemonData(this.endpointURL);
        this.flavorText = await getFlavorText();
        this.types = await getTypes(this.pokemonData.types);
        this.name = this.pokemonData.name;
        this.weight = parseInt(this.pokemonData.weight);
        this.spriteURL = this.pokemonData.sprites.front_default;
    }

    async getPokemonData(URL) {
        const response = await fetch(URL);
        const pokemonData = await convertToJson(response);

        return pokemonData;
    }

    async getFlavorText() {
        const response = await fetch(this.pokemonData.species.url);
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

}