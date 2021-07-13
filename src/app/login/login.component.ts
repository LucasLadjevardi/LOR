import { Component, Input, OnInit, Output, ɵɵNgOnChangesFeature } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { style } from '@angular/animations';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  LoginForm: FormGroup = new FormGroup({});

  RememberMe: boolean = false;

  constructor(private _router: Router, public _LoginService: LoginService, private fb: FormBuilder) {
  }

  get Username() { return this.LoginForm.get('Username'); }
  get Password() { return this.LoginForm.get('Password'); }
  get Email() { return this.LoginForm.get('Email'); }
  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
    this._LoginService.TakenUsername.subscribe();
    this.initializeForm();
    this.formControlValueChanged();
  }

  initializeForm(): void {
    this.LoginForm = this.fb.group({
      id: 0,
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required, Validators.email]],
      Role: 'User'
    });
  }


  CreateAccount(): void {
    var Usernametaken = this._LoginService.TakenUsernameBehavior;
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
        switch (jqXHR.status) {
          case 400:
            alert('wrong');
            Usernametaken.next(true);
            break;

          case 403:
            alert('All fields must be filled');
            break;

          case 500:
            alert('Looks like we are having issues with our servers, try again later');
            break;

          default:
            break;
        }
      },
      contentType: "application/json; charset=utf-8",
    });
    console.log(Usernametaken);
  }

  public Login(): void {
    var ProfileBehavior = this._LoginService.ProfileBehavior;
    var router = this._router;
    var RememberMe = this.RememberMe;
    var settings = {
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
        switch (jqXHR.status) {
          case 400:
            alert('wrong');
            break;

          case 403:
            alert('All fields must be filled');
            break;

          case 404:
            alert("User not found");
            break;

          case 500:
            alert('Looks like we are having issues with our servers, try again later');
            break;

          default:
            break;
        }
      },
      contentType: "application/json; charset=utf-8"
    }
    $.ajax(settings).done(function (data) {
      if (RememberMe) {
        localStorage.setItem('token', data)
        if (localStorage.getItem('token') != null) {
          ProfileBehavior.next(true);
          router.navigate(['/home']);
        }
      }
      else if (!RememberMe) {
        console.log('you are here')
        sessionStorage.setItem('token', data)
        if (sessionStorage.getItem('token') != null) {
          ProfileBehavior.next(true);
          router.navigate(['/home']);
        }
      }
    });
  }

  formControlValueChanged() {
    this.LoginForm.get('Username')?.valueChanges.subscribe(
      (mode: string) => {
        this._LoginService.TakenUsernameBehavior.next(false);
      });
  }

  ToggleRememberMe(event: any) {
    if (event.target.checked) {
      this.RememberMe = true;
    }
    else {
      this.RememberMe = false;
    }
  }
}