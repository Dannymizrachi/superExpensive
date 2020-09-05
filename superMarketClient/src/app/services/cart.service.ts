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
    this.products = [];
    this.total = 0;
    this.usersCart = [];
  }

  public getUsersCartItems(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:3000/cartItem');
  }
  public addToCart(currentProduct: Products) {
    return this.http.post(
      'http://localhost:3000/cartItem/addToCart',
      currentProduct
    );
  }
  public deleteItemFromCart(currentProduct: Products) {
    return this.http.post(
      'http://localhost:3000/cartItem/deleteItem',
      currentProduct
    );
  }
}
