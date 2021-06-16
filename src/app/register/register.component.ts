import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User("","","","");

  constructor(private _registerService : RegisterService) { }

  ngOnInit(): void {
  }

  registerUser(): any{
    this._registerService.register(this.user).subscribe(
      data => console.log("response recieved"),
      error => console.log("exception occured")
      
    );
  
  }

}
