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

  public UserData = [{
    id: 0,
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    Role: 'User'
  }];

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
    console.log(this.LoginForm.value);
    //this.LoginForm.controls.Username
  }

  Login() {
    this._router.navigate(['/profile']);
  }

}


