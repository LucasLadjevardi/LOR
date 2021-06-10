import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public UserName ="";
  public Password="";
  public RepeatPassword="";
  public Email="";
  
  
  constructor(private _router: Router) {

  }
  
  ngOnInit(): void {
  

  }



  CheckUserLogin(){
    console.log("wORKS");
  }

  CreateAccount(){
    if(this.RepeatPassword==this.Password){
      console.log("Account Create welcome", this.UserName)
    }
  }
}
