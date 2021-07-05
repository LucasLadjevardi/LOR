import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public UserData = [{
    id: "",
    Username: "",
    Password: "",
    RepeatPassword: "",
    Email: "",
    Role: "User"
  }];
  
  constructor(private _router: Router, private _LoginService :LoginService) {

  }
  
  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
  }
  
  
  // http://192.168.4.110:48935/api/Users/username/password
  AccountLogin(){
      var UserCheck: any;
      var url = `http://192.168.4.110:48935/api/Users/${this.UserData[1]}/${this.UserData[2]}`
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "error": function (jqXHR: { status: number; }, exception: any){
          if(jqXHR.status == 404){
            alert("Username and/or password was incorrect")
          }
          else if(jqXHR.status == 400)
          {
            alert("Username and/or password was incorrect")
          }
        }
      }
      $.ajax(settings).done( (response) => {
        UserCheck = response;
      })
      .then( () => {
        if(UserCheck.username == this.UserData[1] && UserCheck.password == this.UserData[2])
        {
          this._LoginService.ProfileBehavior.next(true);
          this._router.navigate(['/home']);
        }
      });
  }
  
  /*AccountLogin(){
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
}*/

  CreateAccount(UserData: any){
    if(UserData[2] == UserData[3]){
      $.ajax({
        url:"http://192.168.4.110:48935/api/Users",
        type:"POST",
        async:true,
        crossDomain:true,
        dataType:"json",
        data:JSON.stringify({
         "username": UserData[1],
         "password": UserData[2],
         "email": UserData[4],
         "role": "User"
        }),
        contentType:"application/json; charset=utf-8",
    }); 
    } else if(UserData[2] != UserData[3]){
      
    }
  }

  LoginHelp(){

  }
}

