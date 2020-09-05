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

  constructor(
    public productService: ProductService,
    public usersService: UserService,
    public cartService: CartService,
    public router: Router,
    public categoriesService: CategoriesService
  ) {
    this.addToCartModel = new Products();
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
        this.cartService.total = cartItems[0].total_price;
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
    console.log(product);
    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
      if (product.id === this.cartService.usersCart[index].id) {
        isfound = true;
        this.cartService.usersCart[index].amount++;
        // product.total_price = this.cartService.usersCart[index].total_price;
      }
    }
    if (isfound == false) {
      console.log(product);
      console.log(this.addToCartModel);
      this.cartService.usersCart.push(product);
    }
<<<<<<< HEAD
    this.addToCartModel.id = product.id;
    this.addToCartModel.amount = 1;
    this.addToCartModel.unit_price = product.unit_price;

    let observable = this.cartService.addToCart(this.addToCartModel);
=======

    this.cartService.total += product.unit_price;
    let observable = this.cartService.addToCart(product);
>>>>>>> 6af6120a5d00f2cee2e629004f8583a852fb46fa

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
<<<<<<< HEAD
    this.deleteItem.id = product.id;
    this.deleteItem.amount = 1;
    this.deleteItem.unit_price = product.unit_price;
    if (this.cartService.usersCart.length == 0) {
      return;
    }
=======
    let isfound = false;
>>>>>>> 6af6120a5d00f2cee2e629004f8583a852fb46fa

    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
<<<<<<< HEAD
      if (product.id === this.cartService.usersCart[index].id) {
        isfound = true;
        this.cartService.usersCart[index].amount--;
        product.total_price = this.cartService.usersCart[index].total_price;
      }
    }
    if (isfound == false) {
      const index = this.cartService.usersCart.indexOf(product);
      if (index > -1) {
        this.cartService.usersCart.splice(index, 1);
=======
      let currentProduct = this.cartService.usersCart[index];
      if (product.product_id === currentProduct.product_id) {
        isfound = true;
        if (currentProduct.amount == 1) {
          this.cartService.usersCart.splice(index, 1);
        } else {
          currentProduct.amount--;
          currentProduct.total_price =
            currentProduct.unit_price * currentProduct.amount;
        }

        this.cartService.total -= currentProduct.unit_price;

        let observable = this.cartService.deleteItemFromCart(product);
        observable.subscribe();
>>>>>>> 6af6120a5d00f2cee2e629004f8583a852fb46fa
      }
    }
  }
}
