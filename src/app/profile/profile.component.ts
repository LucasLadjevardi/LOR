import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  EditForm: FormGroup = new FormGroup({});

  public UserData = [{
    id: 0,
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    Role: 'User'
  }];

  get Username() { return this.EditForm.get('Username'); };
  get OldPassword() {return this.EditForm.get('OldPassword');};
  get NewPassword() { return this.EditForm.get('NewPassword'); };
  get Email() { return this.EditForm.get('Email'); };

  constructor(private _router: Router,public _LoginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this._LoginService.ProfileBehavior.value) {
      this._router.navigate(['/home'])
    }
    this._LoginService.TakenUsername.subscribe();
    this.initializeForm();
  }

  initializeForm(): void {
    this.EditForm = this.fb.group({
      id: 0,
      Username: ['', [Validators.required]],
      OldPassword: ['', [Validators.required]],
      NewPassword: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required,Validators.email]],
      Role: 'User'
    });
  }

  EditAccount(){
    var router = this._router;
    var settings = {
      url: `http://192.168.4.110:48935/api/Users/${localStorage.getItem('token')}`,
      type: "PUT",
      async: true,
      crossDomain: true,
      dataType: "json",
      data: JSON.stringify({
        "username": this.EditForm.value.Username,
        "password": this.EditForm.value.NewPassword,
        "email": this.EditForm.value.Email,
      }),
      "error": function (jqXHR: { status: number; }, exception: any) {
        if (jqXHR.status = 400) {
          alert('wrong');
        }

        else if (jqXHR.status = 500) {
          alert('Looks like we are having issues with our servers, try again later');
        }

      },
      contentType: "application/json; charset=utf-8"
    }
    $.ajax(settings).done(function (data) {
      router.navigate(['/home']);
    });
  };

  routingtohmoe(){
    this._router.navigate(['/home'])
  }
}
