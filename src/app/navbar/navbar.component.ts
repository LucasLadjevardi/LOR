import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.HideNavBar()
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

  CheckIfUserIsLogin(){
    //lave et Check få at se hvis bruger er logged ind
    this._router.navigate(['/login']);
  }
}

