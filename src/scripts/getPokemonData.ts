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

async function parsePokemonResponse(response: Response): Promise<PokemonData> {
  const result: unknown = await response.json();
  if (!isPokemonData(result)) {
    throw new Error('Response body did not match Pokemon');
  }
  return result;
}

async function fetchPokemonData(pokemonURL: string): Promise<PokemonData> {
  const response = await fetch(pokemonURL, {
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Bad response. ${response.statusText}: ${response.body}`);
  }

  return parsePokemonResponse(response);
}

export async function getPokemonData(pokemonId: number): Promise<PokemonData> {
  const pokemonURL: string = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  return await fetchPokemonData(pokemonURL);
}
