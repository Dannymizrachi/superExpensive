import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';
import { ProductService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/UserService';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public isCategoryNotShown: boolean = false;
  public addToCartModel: Products;
  public categoryID: number = 0;
  public deleteItem: Products;

  constructor(
    public productService: ProductService,
    public usersService: UserService,
    public cartService: CartService,
    public router: Router,
    public categoriesService: CategoriesService
  ) {
    this.addToCartModel = new Products();
    this.deleteItem = new Products();
  }

  ngOnInit(): void {
    this.usersService.isUserLoggedIn();
    let productObservable = this.productService.getAllProducts();
    productObservable.subscribe(
      (productsList) => {
        for (let index = 0; index < productsList.length; index++) {
          productsList[index].amount = 1;
        }
        this.productService.products = productsList;
      },
      (error) => {
        alert('Failed to get Products ' + JSON.stringify(error));
      }
    );
    let userCartObservable = this.cartService.getUsersCartItems();
    userCartObservable.subscribe((cartItems) => {
      this.cartService.usersCart = cartItems;
      if (cartItems.length != 0) {
        for (let index = 0; index < cartItems.length; index++) {
          this.cartService.total += cartItems[index].total_price;
        }
      }
    });

    this.categoriesService.getAllCategories();
    let categoriesObservable = this.categoriesService.getAllCategories();
    categoriesObservable.subscribe(
      (categoryList) => {
        this.categoriesService.categories = categoryList;
      },
      (error) => {
        alert('Failed to get Categories ' + JSON.stringify(error));
      }
    );
  }

  public addToCart(product: Products) {
    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
      if (product.product_id === this.cartService.usersCart[index].product_id) {
        isfound = true;
        this.cartService.usersCart[index].amount++;
        product.total_price = this.cartService.usersCart[index].total_price;
      }
    }
    if (!isfound) {
      this.cartService.usersCart.push(product);
    }
    this.addToCartModel.product_id = product.product_id;
    this.addToCartModel.amount = 1;
    this.addToCartModel.unit_price = product.unit_price;
    let observable = this.cartService.addToCart(this.addToCartModel);

    observable.subscribe();
  }

  public onOrderClicked() {
    this.router.navigate(['/shipping-details']);
  }
  public showAllProducts() {
    this.categoryID = 0;
  }

  public onCategoryClicked(id: number) {
    console.log(id);
    this.categoryID = id;
  }

  public deleteItemFromCart(product: Products) {
    console.log(product);
    this.deleteItem.product_id = product.product_id;
    this.deleteItem.amount = 1;
    this.deleteItem.unit_price = product.unit_price;
    let isfound = false;
    console.log(this.deleteItem);

    for (let index = 0; index < this.cartService.usersCart.length; index++) {
      if (product.product_id === this.cartService.usersCart[index].product_id) {
        isfound = true;

        if (this.cartService.usersCart[index].amount <= 1) {
          let productIndex = this.cartService.usersCart.indexOf(product);
          this.cartService.usersCart.splice(productIndex, 1);
        }

        product.amount = this.cartService.usersCart[index].amount;
        console.log(this.cartService.usersCart[index].amount);
        this.cartService.usersCart[index].amount--;
        console.log(this.cartService.usersCart[index].amount);

        if (this.cartService.total === 0) {
          this.cartService.usersCart = [];
        }
      }
    }
    let observable = this.cartService.deleteItemFromCart(this.deleteItem);
    observable.subscribe();
  }
}
