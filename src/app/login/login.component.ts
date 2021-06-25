import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import {Router} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BehaviorSubject, Observable } from 'rxjs';
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
 
  /*det er en sub-type af en Observable med en BehaviorSubject skal objecte som man får BehaviorSubject på have en value,
  da det hele tiden sender value til sige "subscription" hvor en observable kun vil sendt det når onnext bliver køret*/ 
  public ProfileBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  //en ting som man kan gjorde med en BehaviorSubject få en observable som vi har gjordt her
  public IsLogged: Observable<boolean> = this.ProfileBehavior.asObservable();
  //en Observable er en function som holder øjer med value/Subject og med den kan man sig at hvis der sker en noget så gøre det her fx en alertbox 

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
      //this._NavBar.TestToSeeIfUserIsLogin(true)
    }
    else{
      //this._NavBar.TestToSeeIfUserIsLogin(false)
    }
    
  }

  CreateAccount(){
    if(this.RepeatPassword==this.Password){
      console.log("Account Create welcome", this.UserName)
    }
  }

  LoginHelp(){

  }
}
