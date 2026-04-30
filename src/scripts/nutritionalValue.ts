import { env } from 'node:process';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1/food/';

export interface USDAData {
  fdcId: number;
  description: string;
  foodNutrients: FoodNutrient[];
}

export interface FoodNutrient {
  number: 203 | 204 | 205;
  amount: number;
}

export function isUSDAData(value: unknown): value is USDAData {
  return (
    typeof value === 'object' && value !== null && 'foodNutrients' in value && `foodCode` in value
  );
}

export async function parseUSDAResponse(response: Response): Promise<USDAData> {
  const result: unknown = await response.json();
  if (!isUSDAData(result)) {
    throw new Error(`Error with response body`);
  }

  return result;
}

export async function fetchUSDA(foodId: number): Promise<Response | undefined> {
  const endpointURL =
    `https://api.nal.usda.gov/fdc/v1/food/${foodId}/` +
    `?format=abridged&nutrients=204&nutrients=205&nutrients=203` +
    `&api_key=${env.API_KEY}`;

  try {
    const response = await fetch(endpointURL, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(
        `Error retrieving USDA data for foodId=${foodId}). ${response.statusText}: ${response.body}`
      );
    }

    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`${err.name}: ${err.message}`);
    }
  }
}

export async function getUSDAData(foodId: number): Promise<USDAData | null> {
  const response = await fetchUSDA(foodId);

  if (response) {
    return await parseUSDAResponse(response);
  }

  return null;
}
