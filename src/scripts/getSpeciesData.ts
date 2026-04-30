export interface SpeciesData {
  flavorTextEntries: { flavor_text: string }[];
}

function isSpeciesData(value: unknown): value is SpeciesData {
  return typeof value === 'object' && value !== null && 'flavorTextEntries' in value;
}

export async function fetchSpeciesData(speciesEndpoint: {
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