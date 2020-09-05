import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/UserService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(private router: Router, private usersService: UserService) {}
  canActivate() : boolean{
    let userTypeObservable = this.usersService.getUserType();
    userTypeObservable.subscribe((userType) => {
      sessionStorage.setItem("userType",JSON.stringify(userType));
      console.log(userType);

      
    });

    if(sessionStorage.getItem("userType") === "ADMIN"){
      return true;
    }
    

    // this.router.navigateByUrl("/home");
    // return false;
    
  }
  
}
