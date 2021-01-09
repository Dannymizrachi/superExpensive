import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { UserRegistrationDetails } from 'src/app/models/UserRegistrationDetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registryForm: FormGroup;
  public userName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmpassword: FormControl;

  public userRegistrationDetails: UserRegistrationDetails;

  constructor(private router: Router, private usersService: UserService) {
    this.userRegistrationDetails = new UserRegistrationDetails();
  }

  ngOnInit(): void {
    this.usersService.isUserLoggedIn();
    this.userName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmpassword = new FormControl('', [Validators.required]);
    this.registryForm = new FormGroup({
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
    });
  }
  //passwords validations
  public checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmpassword = group.get('confirmpassword').value;
    if (pass === confirmpassword && pass.length > 2) {
      this.isRegisterDetailsValid();
    } else {
      alert('passwords does not match');
      return;
    }
  }

  //regex form validation
  public isRegisterDetailsValid() {
    let pattern = new RegExp(
      '^(?=.{0,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
    );
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.userRegistrationDetails.userName = this.userName.value;
    this.userRegistrationDetails.email = this.email.value;
    this.userRegistrationDetails.password = this.password.value;

    if (this.userRegistrationDetails.userName.match(pattern)) {
    } else {
      alert('Number of characters must be between 0 to 20');
      return;
    }
    if (
      this.userRegistrationDetails.email.toLowerCase().match(re) ||
      this.userRegistrationDetails.email == null
    ) {
    } else {
      alert('Please enter a valid Email address');
      return;
    }
    if (this.userRegistrationDetails.password == '') {
      alert('password is mandatory');
      return;
    }
    this.secondPageRegister();
  }
  //move to step 2 registration and save data from step 1 into session storage
  public secondPageRegister() {
    sessionStorage.setItem('userName', this.userRegistrationDetails.userName);
    sessionStorage.setItem('email', this.userRegistrationDetails.email);
    sessionStorage.setItem('password', this.userRegistrationDetails.password);
    this.router.navigate(['/register-step-two']);
  }
}
