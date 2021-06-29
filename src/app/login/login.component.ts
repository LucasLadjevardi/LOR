import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public UserName = "";
  public Password = "";
  public RepeatPassword = "";
  public Email = "";
 
  

  constructor(private _router: Router, private _LoginService :LoginService) {

  }
  
  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
  }
  
  

  AccountLogin(){
      var UserCheck: string | any[];
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://192.168.4.110:48935/api/Users",
        "method": "GET"
      }
      $.ajax(settings).done( (response) => {
        UserCheck = response;
      })
      .then( () => {
        for (let i = 0; i < UserCheck.length; i++) {
          var Users = UserCheck[i];
          if(this.UserName == Users.username && this.Password == Users.password)
          {
            this._LoginService.ProfileBehavior.next(true);
            this._router.navigate(['/home']);
          }
        }
      });
  }
  

  CreateAccount(){
    if(this.RepeatPassword==this.Password){
      console.log("Account Create welcome", this.UserName)
    }
  }

  LoginHelp(){

  }
}

