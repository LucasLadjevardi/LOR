import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }
  
  ngOnInit(): void {

  }

  CheckUserLogin(){
    console.log("wORKS");
  }

  CreateAccount(){
    let UserName = document.getElementById("UserName")
    let Password = document.getElementById("Password")
    let PasswordRepeat = document.getElementById("PasswordRepeat")
    let Email = document.getElementById("Email")
    console.log(UserName);
  }
}
