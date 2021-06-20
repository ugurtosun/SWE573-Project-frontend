import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { SearchService } from '../search.service';
import { AutocompleteService } from '../autocomplete.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  formGroup!: FormGroup;
  articleID = "";
  article = new Article();
  wikiOptions!: [WikiObject];
  query!: string;
  customTagName!: string;
  customTagDescription!: string;
  wikiObject = new WikiObject();

  constructor(private router: ActivatedRoute, private _searchService:SearchService
    ,private _autoCompleteService:AutocompleteService, private fb : FormBuilder) { }

   ngOnInit(): void {
    
    console.log(this.router.snapshot.params);
    this.articleID = this.router.snapshot.params.id;
    
    this._searchService.getArticle(this.articleID).subscribe(
      data => {
        console.log("response recieved");
        this.article = JSON.parse(JSON.stringify(data))[0];
        console.log("There are " + this.article.title + " articles")
      },
      error => console.log("exception occured")   
    );
    this.initForm();
  }

   getWikiDatas(): any{
     this._autoCompleteService.search(this.query).subscribe(
       data =>  {
        console.log("data recieved") 
        console.log(data) 
        this.wikiOptions = data.search;
       },
       error => {
        console.log("noo error")
       }
     )
   }

   initForm(){

      this.formGroup = this.fb.group({
        'wikidata' : ['']
      })

      this.formGroup.get('wikidata')?.valueChanges.subscribe(response => {
        console.log('inittt')
        this.getWikiDatas();
      })
   }

   tagArticle(){

    this.wikiObject.customTagName = this.customTagName;
    this.wikiObject.customDescription = this.customTagDescription;
    console.log(this.wikiObject)
   }

   displayFn(wikiObject: WikiObject): string {
    return wikiObject? wikiObject.description: wikiObject;
  }
}

export class WikiObject {

  public id!: string;
  label!: string;
  url!: string;
  description!: string;
  customTagName!: string;
  customDescription!: string;

  constructor() { }
}