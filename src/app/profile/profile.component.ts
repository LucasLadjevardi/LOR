import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';

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
      //lave et api call hvor du tilføj nyt data til bruger
      this._router.navigate(['/home']);
  };

  routingtohmoe(){
    this._router.navigate(['/home'])
  }
}
