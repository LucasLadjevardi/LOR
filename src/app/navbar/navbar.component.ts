import {  Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 
  constructor(private _router: Router, public _LoginService: LoginService) { }

  ngOnInit(): void {
    this.HideNavBar();
    this._LoginService.IsLogged.subscribe()
    if(localStorage.getItem('token') != null)
    {
      this._LoginService.ProfileBehavior.next(true);
    }
  }
  
  HideNavBar(){
    var prevScrollpos = window.pageYOffset; //Her laver vi en variable som så få at videre hvor på  siden vi er.
    const NavBar = document.getElementById("navbar")
    window.onscroll = function() { //denne function køre nå man "scroll"
    var currentScrollPos = window.pageYOffset;//her se vi hvor vi er efter man har "scroll"
    if (prevScrollpos > currentScrollPos) {
      //vi få navbar til at kommer fram igen
      NavBar?.setAttribute("style","top: 0px; transition: top .5s; transition-timing-function: ease-in;")
    } else {
      //få navbar til at "hide"
      NavBar?.setAttribute("style","top: -50px; transition: top .5s; transition-timing-function: ease-out;")
    }
   prevScrollpos = currentScrollPos;
    }
  }

  LoginRoute(){
    this._router.navigate(['/login']);
    console.log();
  }

  LogOut(){
    if(localStorage.getItem('token') != null || sessionStorage.getItem('token')  != null)
    {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      this._LoginService.ProfileBehavior.next(false);
      this._router.navigate(['/login']);
    }
    else
    {
      this._router.navigate(['/home']);
    }
  }
}