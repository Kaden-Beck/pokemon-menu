import { getPokemonData } from './getPokemonData';
import { fetchSpeciesData, SpeciesData } from './getSpeciesData';

import { getTypeDetails, getTypeSprites, PokemonTypeDetails, spriteInfo } from './pokemonTypes';

export interface PokemonDetails {
  id: number;
  endpoint: string;
  pokedexUrl: string;
  pokedexEntry: string;
  name: string;
  flavorText: string;
  typeDetails: PokemonTypeDetails[];
  typeSprites: spriteInfo[];
  nutritionalData: {} | undefined;
  weight: number;
  height: number;
}

export async function getPokemonDetails(pokemonId: number) {
  const pokemonData = await getPokemonData(pokemonId);

  const speciesData = await fetchSpeciesData(pokemonData.species);
  const typeDetails = getTypeDetails(pokemonData);

  return {
    id: pokemonId,
    endpoint: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    pokedexUrl: `https://www.pokemon.com/us/pokedex/${pokemonData.name}`,
    pokedexEntry: pokemonData.sprites.front_default,
    name: pokemonData.name,
    flavorText: speciesData.flavorTextEntries[0].flavor_text,
    typeDetails: typeDetails,
    typeSprites: getTypeSprites(typeDetails),
    nutritionalData: undefined,
    weight: pokemonData.weight,
    height: pokemonData.height,
  };
}
