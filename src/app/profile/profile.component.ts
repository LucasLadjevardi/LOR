import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public UserName ="";
  public OldPassword="";
  public NewPassword="";
  public RepeatNewPassword="";
  public RepeatPassword="";
  public Email="";

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const btn = document.getElementById("EditAccoun")?.click()
  }

  EditAccount(){
    if(this.OldPassword!=this.NewPassword && this.NewPassword == this.RepeatNewPassword)
    {
      //lave et api call hvor du tilføj de nyt data
      this._router.navigate(['/home']);
    }
  };

  routingtohmoe(){
    this._router.navigate(['/home'])
  }
}
