import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public UserData = [{
    id: 0,
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    Role: 'User'
  }];

  constructor(private _router: Router,public _LoginService: LoginService) { }

  ngOnInit(): void {
    this._LoginService.TakenUsername.subscribe();
  }

  EditAccount(){
      //lave et api call hvor du tilføj de nyt data
      this._router.navigate(['/home']);
  };

  routingtohmoe(){
    this._router.navigate(['/home'])
  }
}
