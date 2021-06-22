import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import {Router} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

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
 
  
  constructor(private _router: Router, private _NavBar :NavbarComponent) {

  }
  
  ngOnInit(): void {

  }
  
  
  AccountLogIn(){
    if(this.UserName!=" " && this.Password!=" "){
      this._router.navigate(['/home']);
      this._NavBar.TestToSeeIfUserIsLogin(true)
    }
    else{
      this._NavBar.TestToSeeIfUserIsLogin(false)
    }
    
  }

  CreateAccount(){
    if(this.RepeatPassword==this.Password){
      console.log("Account Create welcome", this.UserName)
    }
  }
}
