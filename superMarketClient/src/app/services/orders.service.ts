import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/orderDetails';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receipt } from '../models/Receipt';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public receiptDetails:Receipt[];
  
  constructor(private http: HttpClient) { }

  public insertShippingDetails(shippingDetails: OrderDetails) {
    return this.http.post<void>(
      'http://localhost:3000/shipping-details',
      shippingDetails
    );
  }
  public getReceipt(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(
      'http://localhost:3000/shipping-details/order-info'
      
    )
  }
}
