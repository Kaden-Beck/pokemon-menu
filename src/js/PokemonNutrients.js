import { getLocalStorage, convertToJson } from "./utilities.mjs";

const USDAKey = "TSg8QgplHdfokkjvTG6XOuAdBJmaHNOtb9kXha3F";
const baseURL = "https://api.nal.usda.gov/fdc/v1/food/";

// GET data from USDA API
async function getUSDAData(foodID) {
  const endpointURL =
    baseURL +
    foodID +
    "?format=abridged&nutrients=204&nutrients=205&nutrients=203&api_key=" +
    USDAKey;
  const response = await fetch(endpointURL);
  const foodData = await convertToJson(response);
  return foodData;
}

export default class PokemonNutrients {
  constructor(pokemonData, typeNames) {
    this.pokemonData = pokemonData;
    this.typeNames = typeNames;
  }

  async init() {
    this.weight = this.pokemonData.weight;
    this.carbFactor = 0;
    this.fatFactor = 0;
    this.proteinFactor = 0;
    this.weightFactor = this.weight / 100;
  }

  async buildPokemonNutrients() {
    await this.calculateNutrients();
    this.totalCalories =
      this.carbohydrates * 4.0 + this.fats * 9.0 + this.proteins * 4.0;

    let display = `<h3>Nutritional Information</h3>
          <p>Pokemon Weight: ${this.weight} grams</p>
          <ul>
          <strong>Nutrients by Weight:</strong>
            <li>Carbs: ${this.carbohydrates.toFixed(2)} g</li>
            <li>Fat: ${this.fats.toFixed(2)} g</li>
            <li>Protein: ${this.proteins.toFixed(2)} g</li>
          </ul>
          <p><strong>Total Calories:</strong> ${this.totalCalories.toFixed(2)} kCal</p>`;
    return display;
  }

  async calculateNutrients() {
    const typeCount = parseInt(this.typeNames.length);
    const typeData = await getLocalStorage("typeInfo");

    for (const typeName of this.typeNames) {
      let type = typeData[typeName];
      await this.getNutrientFactors(type.foodID);
    }

    // Average Factors
    if (typeCount > 1) {
      this.carbFactor = parseFloat(this.carbFactor / typeCount);
      this.fatFactor = this.fatFactor / typeCount;
      this.proteinFactor = this.proteinFactor / typeCount;
    }

    // convert factors to nutrients
    this.carbohydrates = this.convertNutrientFactor(this.carbFactor);
    this.fats = this.convertNutrientFactor(this.fatFactor);
    this.proteins = this.convertNutrientFactor(this.proteinFactor);
  }

  async getNutrientFactors(foodID) {
    let foodData = await getUSDAData(foodID);

    this.carbFactor += foodData.foodNutrients[0].amount;
    this.proteinFactor += foodData.foodNutrients[1].amount;
    this.fatFactor += foodData.foodNutrients[2].amount;
  }

  // Convert factor to real nutrients using Pokémon weight factor
  convertNutrientFactor(nutrientFactor) {
    let convertedFactor = nutrientFactor * this.weightFactor;
    return convertedFactor;
  }
}
