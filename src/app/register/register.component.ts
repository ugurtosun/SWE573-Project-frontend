import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User("","","");
  resultMessage = "";
  confirmPassword = "";
  msg = "";

  constructor(private _registerService : RegisterService, private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(): any{

    if(this.confirmPassword != this.user.password){
      this.msg = "Bad credentials, please enter valid password pair"
      return
    }

    this._registerService.register(this.user).subscribe(
      data => {
        console.log("response recieved")
        this.msg = "Success"
        this.router.navigate(['/login']);
      },
      error => {
        console.log("exception occured")
        this.msg = "Registration failed, please check the form"
      }
      
    );
  
  }

}
