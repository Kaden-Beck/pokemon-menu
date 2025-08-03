## POKEMON API Reference


### Get Entries from Gen I Pokedex
GET https://pokeapi.co/api/v2/pokedex/{generation}

### Get Pokemon Info by PokemonID

GET https://pokeapi.co/api/v2/pokemon/{ID}

pokemon.id: Pokemon ID
pokemon.name: Pokemon Name
pokemon.weight: Pokemon Weight
pokemon.height: Pokemon Height 
pokemonData.sprites.front_default: Pokemon Sprite Image

pokemon.types[]: Array of pokemon's types  
pokemon.types[].type.name: Get name of pokemon type name(s)

pokemon.species.url: API endpoint for species 

### Get info on Pokemon species (Flavor Text)

GET https://pokeapi.co/api/v2/pokemon-species/{ID} OR GET 'pokemon.species.url'

pokemonSpecies.flavor_text_entries[1].flavor_text: Returns 1st flavor text for given species
Entry.shape: Returns shape of pokemon