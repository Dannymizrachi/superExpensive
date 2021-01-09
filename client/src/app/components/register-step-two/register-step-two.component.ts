import { Component, OnInit } from '@angular/core';
import { UserRegistrationDetails } from 'src/app/models/UserRegistrationDetails';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService';
import { CitiesService } from 'src/app/services/cities.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css'],
})
export class RegisterStepTwoComponent implements OnInit {
  public userRegistrationDetails: UserRegistrationDetails;
  public registryFormPartTwo: FormGroup;
  public street: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public cityName: FormControl;

  constructor(
    private usersService: UserService,
    private router: Router,
    public citiesService: CitiesService
  ) {
    this.userRegistrationDetails = new UserRegistrationDetails();
  }
  ngOnInit(): void {
    this.usersService.isUserLoggedIn();
    this.cityName = new FormControl('', [Validators.required]);
    this.street = new FormControl('', [Validators.required]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.registryFormPartTwo = new FormGroup({
      city: this.cityName,
      street: this.street,
      firstName: this.firstName,
      lastName: this.lastName,
    });
    let observable = this.citiesService.getAllCities();
    observable.subscribe(
      (citiesList) => {
        this.citiesService.cities = citiesList;
      },
      (error) => {
        alert('Failed to get cities ' + JSON.stringify(error));
      }
    );
  }

  //add new user to the DB
  public addUser() {
    console.log(this.cityName.value);
    this.userRegistrationDetails.city = this.cityName.value;
    this.userRegistrationDetails.street = this.street.value;
    this.userRegistrationDetails.firstName = this.firstName.value;
    this.userRegistrationDetails.lastName = this.lastName.value;

    (this.userRegistrationDetails.userName = sessionStorage.getItem(
      'userName'
    )),
      (this.userRegistrationDetails.email = sessionStorage.getItem('email')),
      (this.userRegistrationDetails.password = sessionStorage.getItem(
        'password'
      ));
    console.log(this.userRegistrationDetails);

    let loginObservable = this.usersService.createUser(
      this.userRegistrationDetails
    );
    loginObservable.subscribe(
      () => {
        this.router.navigate(['/register-step-three']);
      },
      (errorObject) => {
        alert('User name already exists');
        console.log(errorObject.error);
      }
    );
  }
}
