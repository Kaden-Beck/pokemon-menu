import { getTypes, PokemonTypeTuple } from './pokemonTypes';

const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';
const POKEDEX_URL = 'https://www.pokemon.com/us/pokedex/';

export interface PokemonData {
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeData[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
}

export interface PokemonTypeData {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  id: number;
  endpoint: string;
  pokedexUrl: string;
  pokedexEntry: string;
  name: string;
  flavorText: string;
  types: PokemonTypeTuple[];
  typeSprites: {};
  nutritionalData: {} | undefined;
}

export interface SpeciesData {
  flavorTextEntries: { flavor_text: string }[];
}

function isPokemonData(value: unknown): value is PokemonData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'height' in value &&
    'weight' in value &&
    'types' in value &&
    'species' in value &&
    'sprites' in value
  );
}

function isSpeciesData(value: unknown): value is SpeciesData {
  return typeof value === 'object' && value !== null && 'flavorTextEntries' in value;
}

async function parsePokemonResponse(response: Response): Promise<PokemonData> {
  if (!response.ok) {
    throw new Error('Bad response');
  }
  const result: unknown = response.json();
  if (!isPokemonData(result)) {
    throw new Error('Response body did not match Pokemon');
  }
  return result;
}

async function fetchPokemon(pokemonURL: string): Promise<PokemonData> {
  const response = await fetch(pokemonURL, {
    method: 'GET',
    mode: 'cors',
  });

  return parsePokemonResponse(response);
}

async function fetchSpeciesData(speciesEndpoint: {
  name: string;
  url: string;
}): Promise<SpeciesData> {
  const response = await fetch(speciesEndpoint.url);
  if (!response.ok) {
    throw Error(
      `Error retrieving Species Data for ${speciesEndpoint.name} from ${speciesEndpoint.url}`
    );
  }
  const result: unknown = await response.json();

  if (!isSpeciesData(result)) {
    throw new Error(`There was an error parsing the species data for ${speciesEndpoint.name}`);
  }

  return result as SpeciesData;
}

export async function getPokemonDetails(pokemonId: number) {
  const pokemonURL: string = POKEMON_ENDPOINT + pokemonId;

  const pokemonData: PokemonData = await fetchPokemon(pokemonURL);
  const speciesData: SpeciesData = await fetchSpeciesData(pokemonData.species);

  const pokemon: PokemonDetails = {
    id: pokemonId,
    endpoint: pokemonURL,
    pokedexUrl: `${POKEDEX_URL}/${pokemonData.name}`,
    pokedexEntry: pokemonData.sprites.front_default,
    name: pokemonData.name,
    flavorText: speciesData.flavorTextEntries[0].flavor_text,
    types: getTypes(pokemonData),
    typeSprites: {},
    nutritionalData: undefined,
  };

  return pokemon;
}
