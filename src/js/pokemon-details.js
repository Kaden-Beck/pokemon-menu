import { loadHeaderFooter, getParam } from "./utilities.mjs";
import PokemonData from "./PokemonDetails.mjs";

loadHeaderFooter();

// Get PokemonID from URL parameters, create a new PokemonDetails Object to store the data for that pokemon
const pokemonID = getParam('pokemonID');
const myPokemonData = new PokemonData(pokemonID);


// Initialize and render content for page
myPokemonData.init();
