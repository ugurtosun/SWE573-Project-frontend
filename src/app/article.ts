import { WikiObject } from "./article/article.component";

export class Article {

    pmid!: string;
    title!: string;
    articleAbstract!: string;
    journal!: string;
    keywords!: string[];
    authorList!: string[];
    publishDate!: Date;
    tags!: WikiObject[];

    constructor(){

    }

}

