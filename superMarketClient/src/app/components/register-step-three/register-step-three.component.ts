import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.css'],
})
export class RegisterStepThreeComponent implements OnInit {
  public userLoginDetails: UserLoginDetails;
  private usersService: UserService;

  constructor(usersService: UserService, private router: Router) {
    this.userLoginDetails = new UserLoginDetails();
    this.usersService = usersService;
  }

  public login() {
    this.userLoginDetails.userName = sessionStorage.getItem('userName');
    this.userLoginDetails.password = sessionStorage.getItem('password');

    let loginObservable = this.usersService.login(this.userLoginDetails);
    loginObservable.subscribe(
      (successfulLoginResponse) => {
        sessionStorage.setItem(
          'LoginToken',
          'Bearer ' + successfulLoginResponse.token
        );
        if (successfulLoginResponse.userType == 'CUSTOMER') {
          this.router.navigate(['/products']);
        }

        if (successfulLoginResponse.userType == 'ADMIN') {
          this.router.navigate(['/admin']);
        }

        console.log(successfulLoginResponse);
        this.usersService.isUserLoggedIn();
      },
      (errorObject) => {
        alert(errorObject);
      }
    );
  }

  ngOnInit(): void {}
}
