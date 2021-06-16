export class SearchQuery {

    query:string;
    isCombined:boolean;
    fields:string;

    constructor(query:string, isCombined:boolean,fields:string){
        this.query = query;
        this.isCombined = isCombined;
        this.fields = fields;
    }
}
