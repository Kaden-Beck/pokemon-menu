export default class TypeData {
    constructor() {
    }

    async getTypeData() {
        const response = await fetch('/json/types.json');
        const typeData = await convertToJson(response);
        this.typeData = typeData;
        return typeData;
    }   

    async getTypeByName(typeName) {
        const typeName =  this.typeData[typeName];
        return typeName;
    }

}

