export default class TypeData {
    constructor() {
    }

    async getTypeData() {
        const response = await fetch('json/types.json');
        const t = await convertToJson(response);
        this.typeData = t;
        console.log(t)
        return t;
    }   

    async getTypeByName(typeName) {
        const t =  await this.typeData[typeName];
        return t;
    }

}

