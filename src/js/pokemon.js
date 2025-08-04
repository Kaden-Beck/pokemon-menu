import { loadHeaderFooter, getParam } from "./utilities.mjs";
import PokemonDetails from "./PokemonDetails.mjs";
// import PokemonNutrients from "./PokemonNutrients";
// import TypeData from "./TypeData.mjs";

loadHeaderFooter();

// Get PokemonID from URL parameters, create a new PokemonDetails Object to store the data for that pokemon
const pokemonID = getParam("PokemonID");
const pokemon = new PokemonDetails(pokemonID);

// Initialize and render content for page
pokemon.init();
