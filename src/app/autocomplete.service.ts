import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http:HttpClient) { }

  search(query: string): Observable<any> {
    const url = 'https://api.github.com/search/repositories';
    return this.http
      .get<any>(url, {
        observe: 'response',
        params: {
          q: query,
          sort: 'stars',
          order: 'desc'
        }
      });
  }
}
