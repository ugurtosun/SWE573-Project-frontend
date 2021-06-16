import { Component, OnInit, Query } from '@angular/core';
import { SearchService } from '../search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchQuery } from '../search-query';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Article } from '../article';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _search : SearchService) { }
  
  articles:Article[] = [];
  query = new SearchQuery("", true, "all");

  ngOnInit(): void {
  }

  searchQuery(): any{

    console.log(this.query)
    this._search.search(this.query).subscribe(
      data => {
        console.log("response recieved");
        this.articles = JSON.parse(JSON.stringify(data));
        console.log("There are " + this.articles.length + " articles")
      },
      error => console.log("exception occured")
    );
  }
}





