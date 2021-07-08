import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { style } from '@angular/animations';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  LoginForm: FormGroup = new FormGroup({});

  constructor(private _router: Router, public _LoginService: LoginService, private fb: FormBuilder) {
  }

  get Username() { return this.LoginForm.get('Username'); }
  get Password() { return this.LoginForm.get('Password'); }
  get Email() { return this.LoginForm.get('Email'); }

  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
    this.initializeForm();
    console.log(this.LoginForm.controls);

  }


  initializeForm(): void {
    this.LoginForm = this.fb.group({
      id: 0,
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required,Validators.email]],
      Role: 'User'
    });
    console.log(this.LoginForm.value);

  }

  CreateAccount(): void {
      $.ajax({
        url: "http://192.168.4.110:48935/api/Users",
        type: "POST",
        async: true,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify({
          "username": this.LoginForm.value.Username,
          "password": this.LoginForm.value.Password,
          "email": this.LoginForm.value.Email,
          "role": "User"
        }),
        "error": function (jqXHR: { status: number; }, exception: any) {
          if (jqXHR.status == 400) {
            alert('wrong');
          }
          else if(jqXHR.status == 500){
            alert('wrong');
          }
        },
        contentType: "application/json; charset=utf-8",
      });
      console.log(this.LoginForm.value.Username);
  }

  Login() {
    let token;
    var UID = "UserID";
    var LT;
    $.ajax({
      url: "http://192.168.4.110:48935/api/Users/Login",
      type: "POST",
      async: true,
      headers: {
        "Authorization": localStorage.getItem('token')
      },
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify({
        "username": this.LoginForm.value.Username,
        "password": this.LoginForm.value.Password,
      }),
      "error": function (jqXHR: { status: number; }, exception: any) {
        if (jqXHR.status == 400) {
          alert('wrong');
        }
        else if(jqXHR.status == 500){
          alert('wrong');
        }
      },
      success: function(data) {
        token = data;
        localStorage.setItem(UID, token);
        LT = localStorage.UserID;
        console.log(LT);
      },
      contentType: "application/json; charset=utf-8",
    });
  }

}


