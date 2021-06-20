import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { SearchService } from '../search.service';
import { AutocompleteService } from '../autocomplete.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { VirtualTimeScheduler } from 'rxjs';
import { TagArticleService } from '../tag-article.service';

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
  wikiOptionPassObject!: string;

  constructor(private router: ActivatedRoute,private _tagArticleService:TagArticleService, private _searchService:SearchService
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

  selectOption(item:any){
    this.wikiOptionPassObject=item;
    console.log("selected");
  }

  onChange(item: any) {
    console.log("changeeed");
  }

   getWikiDatas(){
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
         query: new FormControl('')
      })
      this.formGroup.get('query')?.valueChanges.subscribe(response => {
        console.log('inittt')
        this.getWikiDatas();
      })
   }

   tagArticle(){

    const index = parseInt(this.wikiOptionPassObject);
    this.wikiObject = this.wikiOptions[index];
    this.wikiObject.customTagName = this.customTagName;
    this.wikiObject.customDescription = this.customTagDescription;
    this._tagArticleService.tagArticle(this.wikiObject, this.articleID).subscribe(
      data =>  {
       console.log("data recieved") 
       console.log(data)
      },
      error => {
       console.log("noo error")
      })
   }

   displayFn(wikiObject: WikiObject): string {
    return wikiObject? wikiObject.customDescription: wikiObject;
  }
}

export class WikiObject{

  id!: string;
  wikiID!: string;
  title!: string;
  label!: string;
  url!: string;
  description!: string;
  customDescription!: string;
  customTagName!: string;


  constructor() { }
}