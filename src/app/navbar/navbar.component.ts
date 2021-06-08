import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

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
      /*setTimeout(()=>{NavBar?.setAttribute("style","top: -25px")},250)
      setTimeout(()=>{NavBar?.setAttribute("style","top: -15px")},500)
      setTimeout(()=>{NavBar?.setAttribute("style","top: -5px")},750)
      setTimeout(()=>{NavBar?.setAttribute("style","top: 0px")},1000)*/
      NavBar?.setAttribute("style","top : 0")
    } else {
      //få navbar til at "hide"
      NavBar?.setAttribute("style","top: -50px")
    }
   prevScrollpos = currentScrollPos;
    }
  }
}

