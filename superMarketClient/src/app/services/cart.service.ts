import { Injectable } from '@angular/core';
import { Products } from '../models/Products';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public products: Products[];
  public total: number;
  public sum: number;
  public usersCart: Products[];

  constructor(private http: HttpClient) {
    this.total = 0;
    this.products = [];
    this.sum = 0;
    this.usersCart = [];
  }

  public getUsersCartItems(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:3000/cartItem');
  }
  public addToCart(currentProduct: Products) {
    return this.http.post<void>(
      'http://localhost:3000/cartItem/addToCart',
      currentProduct
    );
  }
  public deleteItemFromCart(currentProduct: Products) {
    return this.http.post<void>(
      'http://localhost:3000/cartItem/deleteItem',
      currentProduct
    );
  }

  public updateTotal() {
    console.log(this.usersCart);
    for (let index = 0; index < this.usersCart.length; index++) {
      this.sum = this.sum += this.usersCart[index].total_price;
    }
    this.total = this.sum;
  }
}
