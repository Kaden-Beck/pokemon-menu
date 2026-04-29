import { loadHeaderFooter, getParam } from '../utilities.ts';
import PokemonDetails from '../PokemonDetails.ts';
// import PokemonNutrients from "./PokemonNutrients";
// import TypeData from "./TypeData.mjs";

loadHeaderFooter();
export type UrlParam = string | null;
// Get PokemonID from URL parameters, create a new PokemonDetails Object to store the data for that pokemon
const pokemonID: UrlParam = getParam('pokemonID');

const pokemon = new PokemonDetails(pokemonID);

// Initialize and render content for page
pokemon.init();
