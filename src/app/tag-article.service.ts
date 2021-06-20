import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WikiObject } from './article/article.component';

@Injectable({
  providedIn: 'root'
})
export class TagArticleService {

  constructor(private http : HttpClient) {}
  
  public tagArticle(tagObject: WikiObject, articleID:string):Observable<any>{
  
    let params = new HttpParams();
    params = params.append('customTagName', tagObject.customTagName);
    params = params.append('customDescription', tagObject.customDescription);
    params = params.append('wikiTagName', tagObject.label);
    params = params.append('wikiURL', tagObject.url);
    params = params.append('wikiID', tagObject.id);
    params = params.append('articleID', articleID);

    console.log("Tag article service is called")
    return this.http.get<any>("http://localhost:8080/tags/createTag", {params: params});

  }
}


