import { PokemonData } from './getPokemonDetails';

export type PokemonTypeTuple = [name: string, url: string];

export function getTypes(pokemonData: PokemonData): PokemonTypeTuple[] {
  const types = pokemonData.types;
  const typeList: PokemonTypeTuple[] = [];

  for (const type of types) {
    typeList.push([type.type.name, type.type.url]);
  }
  return typeList;
}
