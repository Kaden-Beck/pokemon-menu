import TypeData from "./TypeData.mjs";

const USDAKey = import.meta.env.USDA_KEY
const baseURL = import.meta.env.USDA_ENDPOINT

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// GET data from USDA API 
async function getUSDAData(foodID) {
    const endpointURL = baseURL + foodID + '?format=abridged&nutrients=204&nutrients=205&nutrients=203&api_key=' + USDAKey;
    const response = await fetch(endpointURL);
    const foodData = await toJSON(response);
    return foodData;
}

export default class PokemonNutrients {
    constructor(pokemon) {
        this.pokemonData = pokemon; 
        this.weight = this.pokemonData.weight;
        this.types = this.pokemonData.types;
    }

    async init() {
        this.carbFactor = 0
        this.fatFactor = 0
        this.proteinFactor = 0
        this.weightFactor = this.weight / 100;
        const TypeData = new TypeData();
        this.typeData = await TypeData.getTypeData();

        await this.calculateNutrients();
        this.totalCalories = this.carbohydrates + this.fats + this.proteins;
    }

    async calculateNutrients() {
        const typeCount = this.types.length();

        // get nutrient data for each type
        this.types.forEach(async typeName => {
            let type = typeData[typeName];
            let foodID = parseInt(type.foodID);
            await this.getNutrientFactors(foodID);
        });

        // Average Factors
        if(typeCount > 1) {
            this.carbFactor = carbFactor / typeCount
            this.fatFactor = fatFactor / typeCount
            this.proteinFactor = proteinFactor / typeCount
        }

        // convert factors to nutrients
        this.carbohydrates = this.convertNutrientFactor(this.carbFactor)
        this.fats = this.convertNutrientFactor(this.fatFactor)
        this.proteins = this.convertNutrientFactor(this.proteinFactor)
    }


    async getNutrientFactors(foodID) {
        let foodData = await getUSDAData(foodID);

        this.carbFactor += parseFloat(foodData.foodNutrients[0].amount);
        this.proteinFactor += parseFloat(foodData.foodNutrients[1].amount);
        this.fatFactor += parseFloat(foodData.foodNutrients[2].amount);
    }

    // Convert factor to real nutrients using Pokémon weight factor
    convertNutrientFactor(nutrientFactor) {
        let convertedFactor = nutrientFactor * this.weightFactor;
        return convertedFactor;
    }
}