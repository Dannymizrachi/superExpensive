import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/orderDetails';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public insertShippingDetails(shippingDetails: OrderDetails) {
    return this.http.post<void>(
      'http://localhost:3000/shipping-details',
      shippingDetails
    );
  }
  // public getReceipt(): Observable<> {

  // }
}
