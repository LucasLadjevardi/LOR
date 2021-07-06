import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { style } from '@angular/animations';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm?: FormGroup;

  public UserData = [{
    id: 0,
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    Role: 'User'
  }];

  constructor(private _router: Router, private _LoginService: LoginService) {
  }

  get LoginUserNameControl() { return this.LoginForm?.get('UserNameControl') }

  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
    this.ValidatingLogin();
  }


  // http://192.168.4.110:48935/api/Users/username/password
  AccountLogin() {
    var UserCheck: any;
    var url = `http://192.168.4.110:48935/api/Users/${this.UserData[0].Username}/${this.UserData[0].Password}`
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "error": function (jqXHR: { status: number; }, exception: any) {
        if (jqXHR.status == 404) {
          console.log(exception)
        }
        else if (jqXHR.status == 400) {
          console.log(exception)
        }
        else if (jqXHR.status == 500) {
          console.log(exception)
        }
      }
    }
    if (this.UserData[0].Username != "" && this.UserData[0].Password != "") {
      $.ajax(settings).done((response) => {
        UserCheck = response;
      })
        .then(() => {
          if (UserCheck.username == this.UserData[0].Username && UserCheck.password == this.UserData[0].Password) {
            this._LoginService.ProfileBehavior.next(true);
            this._router.navigate(['/home']);
          }
          else {

          }
        });
    }
  }

  CreateAccount() {
    if (this.UserData[0].Password == this.UserData[0].RepeatPassword) {
      $.ajax({
        url: "http://192.168.4.110:48935/api/Users",
        type: "POST",
        async: true,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify({
          "username": this.UserData[0].Username,
          "password": this.UserData[0].Password,
          "email": this.UserData[0].Email,
          "role": "User"
        }),
        contentType: "application/json; charset=utf-8",
      });
      console.log(this.UserData);
    }
  }

  ValidatingLogin() {
    this.LoginForm = new FormGroup(
      {
        UserNameControl: new FormControl(this.UserData[0].Username,
          [
            Validators.required
          ])
      })
  }
}

