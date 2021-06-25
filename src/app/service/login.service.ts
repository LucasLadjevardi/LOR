import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /*det er en sub-type af en Observable med en BehaviorSubject skal objecte som man får BehaviorSubject på have en value,
  da det hele tiden sender value til sige "subscription" hvor en observable kun vil sendt det når onnext bliver køret*/ 
  public ProfileBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  //en ting som man kan gjorde med en BehaviorSubject få en observable som vi har gjordt her
  public IsLogged: Observable<boolean> = this.ProfileBehavior.asObservable();
  //en Observable er en function som holder øjer med value/Subject og med den kan man sig at hvis der sker en noget så gøre det her fx en alertbox 
  
  public Username:string=  "";

  constructor() { }

  
}
