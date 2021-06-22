import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchQuery } from './search-query';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search(query: SearchQuery):Observable<any>{

    let params = new HttpParams();
    params = params.append('keywords', query.query);
    params = params.append('isCombined', query.isCombined);
    params = params.append('fields', query.fields);
    params = params.append('isAdvanced', true);

    console.log("search service is called")
    return this.http.get<any>("http://ec2-18-191-214-254.us-east-2.compute.amazonaws.com:8080/search/searchArticle", {params: params});
    
  }

  public getArticle(id: string):Observable<any>{

    let params = new HttpParams();
    params = params.append('articleIDs', id);
    console.log("getArticle service is called");
    return this.http.get<any>("http://ec2-18-191-214-254.us-east-2.compute.amazonaws.com:8080/search/getArticle", {params: params});
  }

}
