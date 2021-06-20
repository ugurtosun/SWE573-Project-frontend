import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User("","","");
  msg = "";

  constructor(private __loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser(): any{
    this.__loginService.register(this.user).subscribe(
      data => {
        console.log("response recieved")
        if(data){
          this.router.navigate(['/search']);
        }else{
          this.msg = "Bad credentials, please enter valid username and password"
        }
      },
      error =>{ 
        console.log("exception occured")
        this.msg = "Bad credentials, please enter valid username and password"
      }
      );
  }
}
