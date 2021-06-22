import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public register(user : User):Observable<any>{

    console.log(user)
    return this.http.post<any>("http://ec2-18-191-214-254.us-east-2.compute.amazonaws.com:8080/user/login", user)
    
  }
}
