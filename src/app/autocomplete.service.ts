import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http:HttpClient) { }
  
  search(query: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('search', query);

    const url = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en';
    return this.http.get<any>(url, {params: params});
  }
}