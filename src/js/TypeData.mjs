import { convertToJson, setLocalStorage, getLocalStorage } from './utilities.mjs';

export default class TypeData {
  constructor() {}

  async init() {
    const typeData = await this.getTypeData();
    setLocalStorage('typeInfo', typeData);
  }

  async getTypeData() {
    const response = await fetch('/json/types.json');
    return await convertToJson(response);
  }

  async getTypeByName(typeName) {
    const t = await this.types[typeName];
    return t;
  }
}
