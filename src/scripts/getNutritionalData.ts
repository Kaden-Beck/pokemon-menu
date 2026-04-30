import { PokemonDetails } from './getPokemonDetails';
import { PokemonTypeDetails } from './pokemonTypes';

export function calculateSize(pokemonDetails: PokemonDetails) {
  const height = pokemonDetails.height;
  const weightFactor = pokemonDetails.weight / 100;
  return {
    height,
    weightFactor,
  };
}
export function getNutrientFactors(typeDetails: PokemonTypeDetails[]) {}

export function generateNutritonalInfo(pokemonDetails: PokemonDetails) {
  const nutrients = getNutrientFactors(pokemonDetails.typeDetails);
  const { height, weightFactor } = calculateSize(pokemonDetails);
}
