import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderDetails } from 'src/app/models/orderDetails';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
})
export class ShippingDetailsComponent implements OnInit {
  public orderDetails: FormGroup;
  public street: FormControl;
  public date: FormControl;
  public creditCard: FormControl;
  public city: FormControl;
  private orderDetailsModel: OrderDetails;
  public creditCardNum: number;

  constructor(
    public cartService: CartService,
    public userService: UserService,
    private router: Router,
    public citiesService: CitiesService,
    private orderService: OrdersService
  ) {
    this.orderDetailsModel = new OrderDetails();
    this.creditCardNum = 0;
  }

  ngOnInit(): void {
    this.userService.isUserLoggedIn();
    let observable = this.citiesService.getAllCities();
    observable.subscribe(
      (citiesList) => {
        this.citiesService.cities = citiesList;
      },
      (error) => {
        alert('Failed to get cities ' + JSON.stringify(error));
      }
    );

    this.date = new FormControl('', [Validators.required]);
    this.street = new FormControl('', [Validators.required]);
    this.creditCard = new FormControl('', [Validators.required]);
    this.city = new FormControl('', [Validators.required]);

    this.orderDetails = new FormGroup({
      date: this.date,
      street: this.street,
      creditCard: this.creditCard,
      city: this.city,
    });
  }
  //back to shop button
  public backToShop() {
    this.router.navigate(['/products']);
  }

  public orderValid() {
    if (
      this.city.value === null ||
      this.city.value === undefined ||
      this.city.value === ''
    ) {
      alert('Please select a city');
      return;
    }
    if (
      this.street.value === null ||
      this.street.value === undefined ||
      this.street.value === ''
    ) {
      alert('Please enter shipping address');
      return;
    }
    if (
      this.date.value === null ||
      this.date.value === undefined ||
      this.date.value === ''
    ) {
      alert('Please select a date');
      return;
    }
    if (
      this.creditCard.value === null ||
      this.creditCard.value === undefined ||
      this.creditCard.value === ''
    ) {
      alert('Please enter a valid credit card');
      return;
    }
    this.order();
  }
  //complete order
  public order() {
    this.orderDetailsModel.shippingCity = this.city.value;
    this.orderDetailsModel.shippingStreet = this.street.value;
    this.orderDetailsModel.shippingDate = this.date.value;
    this.orderDetailsModel.CreditCard = this.creditCard.value;

    let observable = this.orderService.insertShippingDetails(
      this.orderDetailsModel
    );
    observable.subscribe();
    this.router.navigate(['/thank-you']);
  }
}
