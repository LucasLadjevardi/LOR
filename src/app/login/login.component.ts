import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import {Router} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
  
  /*OnLogIn(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": Placeholder,
      "method": "GET",
      "headers": {
        Placeholder
      }
    }
    $.ajax(settings).done(function res (response) {
      console.log(response);
    })
    .always(function(response){

    });
  }*/
  



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
