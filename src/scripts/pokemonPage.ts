import { getPokemonDetails } from './getPokemonDetails';

export function getPokemonIdFromUrl(): number {
  const raw = new URLSearchParams(window.location.search).get('pokemonID');

  if (raw === null) {
    throw new Error('Missing pokemonID query param');
  }

  const value = Number(raw);

  if (!Number.isInteger(value) || value < 1 || value > 1025) {
    throw new Error('Invalid pokemonID query param');
  }

  return value;
}

async function initializePokemonPage() {
  const pokemon = await getPokemonDetails(getPokemonIdFromUrl());

  console.log(pokemon);
}

initializePokemonPage();
