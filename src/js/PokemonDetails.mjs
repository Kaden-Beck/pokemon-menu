import PokemonNutrients from "./PokemonNutrients";
import TypeData from "./TypeData.mjs";
const baseURL = import.meta.env.POKEMON_ENDPOINT


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
        this.endpointURL = `${baseURL}${this.pokemonId}`;
    }

    async init() {
        this.pokemon = await getPokemonData(this.endpointURL);
        this.flavorText = await getFlavorText();
        this.types = await getTypes(this.pokemon.types);
        this.name = this.pokemon.name;
        this.weight = parseInt(this.pokemon.weight);
        this.spriteURL = this.pokemon.sprites.front_default;
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

    renderPokemonDetails() {
        pokemonDetailsTemplate(this.pokemon);
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
}

function pokemonDetailsTemplate(pokemon) {


//   document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
//   document.querySelector('#p-brand').textContent = product.Brand.Name;
//   document.querySelector('#p-name').textContent = product.NameWithoutBrand;

//   const productImage = document.querySelector('#p-image');
//   productImage.src = product.Images.PrimaryExtraLarge;
//   productImage.alt = product.NameWithoutBrand;
//   const euroPrice = new Intl.NumberFormat('de-DE',
//     {
//       style: 'currency', currency: 'EUR',
//     }).format(Number(product.FinalPrice) * 0.85);
//   document.querySelector('#p-price').textContent = `${euroPrice}`;
//   document.querySelector('#p-color').textContent = product.Colors[0].ColorName;
//   document.querySelector('#p-description').innerHTML = product.DescriptionHtmlSimple;

//   document.querySelector('#add-to-cart').dataset.id = product.Id;
}