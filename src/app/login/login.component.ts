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
    id: 0,
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    Role: 'User'
  }];
  
  constructor(private _router: Router, private _LoginService :LoginService) {

  }
  
  ngOnInit(): void {
    this._LoginService.IsLogged.subscribe();
  }
  
  
  // http://192.168.4.110:48935/api/Users/username/password
  AccountLogin(){
      var UserCheck: any;
      var url = `http://192.168.4.110:48935/api/Users/${this.UserData[0].Username}/${this.UserData[0].Password}`
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
        if(UserCheck.username == this.UserData[0].Username && UserCheck.password == this.UserData[0].Password)
        {
          this._LoginService.ProfileBehavior.next(true);
          this._router.navigate(['/home']);
        }
      });
  }



  CreateAccount(){
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
          if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()
/*     if(this.UserData[0].Password == this.UserData[0].RepeatPassword){
      $.ajax({
        url:"http://192.168.4.110:48935/api/Users",
        type:"POST",
        async:true,
        crossDomain:true,
        dataType:"json",
        data:JSON.stringify({
         "username": this.UserData[0].Username,
         "password": this.UserData[0].Password,
         "email": this.UserData[0].Email,
         "role": "User"
        }),
        contentType:"application/json; charset=utf-8",
      });
      console.log(this.UserData);
    } */
  }
}