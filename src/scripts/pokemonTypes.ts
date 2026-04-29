import { PokemonData } from './getPokemonDetails';

export type PokemonTypeDetails = {
  name: string;
  url: string;
  sprite: string;
  foodId: number;
};

interface TypeInfo {
  name: string;
  id: number;
  spriteURL: string;
  foodID: string;
}

type TypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar';

const typeMap: Record<TypeName, TypeInfo> = {
  normal: {
    name: 'normal',
    id: 1,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/1.png',
    foodID: '2705964',
  },
  fighting: {
    name: 'fighting',
    id: 2,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/2.png',
    foodID: '2346404',
  },
  flying: {
    name: 'flying',
    id: 3,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/3.png',
    foodID: '2707854',
  },
  poison: {
    name: 'poison',
    id: 4,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/4.png',
    foodID: '2685576',
  },
  ground: {
    name: 'ground',
    id: 5,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/5.png',
    foodID: '2709458',
  },
  rock: {
    name: 'rock',
    id: 6,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/6.png',
    foodID: '2707730',
  },
  bug: {
    name: 'bug',
    id: 7,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/7.png',
    foodID: '468191',
  },
  ghost: {
    name: 'ghost',
    id: 8,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/8.png',
    foodID: '2710363',
  },
  steel: {
    name: 'steel',
    id: 9,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/9.png',
    foodID: '2705827',
  },
  fire: {
    name: 'fire',
    id: 10,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/10.png',
    foodID: '2710045',
  },
  water: {
    name: 'water',
    id: 11,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/11.png',
    foodID: '2708961',
  },
  grass: {
    name: 'grass',
    id: 12,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/12.png',
    foodID: '2709599',
  },
  electric: {
    name: 'electric',
    id: 13,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/13.png',
    foodID: '2709224',
  },
  psychic: {
    name: 'psychic',
    id: 14,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/14.png',
    foodID: '577342',
  },
  ice: {
    name: 'ice',
    id: 15,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/15.png',
    foodID: '2705630',
  },
  dragon: {
    name: 'dragon',
    id: 16,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/emerald/16.png',
    foodID: '2709234',
  },
  dark: {
    name: 'dark',
    id: 17,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/17.png',
    foodID: '2485864',
  },
  fairy: {
    name: 'fairy',
    id: 18,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/18.png',
    foodID: '2710777',
  },
  stellar: {
    name: 'stellar',
    id: 19,
    spriteURL:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/19.png',
    foodID: '2039058',
  },
};

export function getTypeDetails(pokemonData: PokemonData): PokemonTypeDetails[] {
  const typeData = pokemonData.types;
  const typeDetailList: PokemonTypeDetails[] = [];

  for (const type of typeData) {
    const typeName: TypeName = type.type.name as TypeName;
    const typeInfo: TypeInfo = typeMap[typeName];
    const typeDetails: PokemonTypeDetails = {
      name: typeName,
      url: type.type.url,
      sprite: typeInfo.spriteURL,
      foodId: Number(typeInfo.foodID),
    };

    typeDetailList.push(typeDetails);
  }

  return typeDetailList;
}
