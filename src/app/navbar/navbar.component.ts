import {  Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /*det er en sub-type af en Observable med en BehaviorSubject skal objecte som man får BehaviorSubject på have en value,
  da det hele tiden sender value til sige "subscription" hvor en observable kun vil sendt det når onnext bliver køret*/ 
  public ProfileBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  //en ting som man kan gjorde med en BehaviorSubject få en observable som vi har gjordt her
  public IsLogged: Observable<boolean> = this.ProfileBehavior.asObservable();
  //en Observable er en function som holder øjer med value/Subject og med den kan man sig at hvis der sker en noget så gøre det her fx en alertbox 

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.HideNavBar()
    this.IsLogged.subscribe();
    console.log(this.ProfileBehavior.getValue())
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
    this.ProfileBehavior.next(true);
    console.log(this.ProfileBehavior.getValue())
    this._router.navigate(['/login']);
  }

  TestToSeeIfUserIsLogin(User:boolean){
    if(User==true){
      console.log("vi er inde",User)
      this.ProfileBehavior.next(true);
    }
    else{
      alert("bad login")
    }
    console.log("vi kom ikke ind",User)
    console.log(this.ProfileBehavior.getValue())
    
  }

  LogOut(){
    this.ProfileBehavior.next(false);
    
  }

  
  /*TestForAtLaveEnLoginMeun(){
    const LoginButton = document.getElementById("LoginButton")
    const dropdown = document.createElement("div")
    const form = document.getElementById("Login")
    LoginButton?.remove();
    form?.appendChild(dropdown)
    dropdown.setAttribute('class','dropdown')
    dropdown.innerHTML =`
          <button class="btn btn-sm text-success rounded-circle dropdown-toggle"  data-bs-toggle="collapse" data-bs-target="#LoginMenu"  
          aria-controls="LoginMenu" aria-expanded="false" aria-label="Toggle navigation">
           <i class="fas fa-user icon-hover"></i>
          </button>
          <ul class=" dropdown-menu dropdown-menu-end" id="LoginMenu" aria-labelledby="LoginMenu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
    `
  }*/
}