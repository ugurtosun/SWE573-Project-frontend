import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { SearchService } from '../search.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { AutocompleteService } from '../autocomplete.service';
import {
  startWith,
  map,
  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleID = "";
  article = new Article();

  public autoComplete$: Observable<any> | undefined;
  public autoCompleteControl = new FormControl();

  constructor(private router: ActivatedRoute, private _searchService:SearchService, private _autoCompleteService:AutocompleteService) { }

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

    this.autoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

  lookup(value: string): Observable<any> {
    return this._autoCompleteService.search(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results.items),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
}

}
