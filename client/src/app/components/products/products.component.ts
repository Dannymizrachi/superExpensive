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
    //check if user is logged in
    this.usersService.isUserLoggedIn();
    //get all products from server
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
    //get users cart items
    let userCartObservable = this.cartService.getUsersCartItems();
    userCartObservable.subscribe((cartItems) => {
      this.cartService.usersCart = cartItems;
      this.cartService.total = 0;
      if (cartItems.length != 0) {
        for (let index = 0; index < cartItems.length; index++) {
          this.cartService.total +=
            cartItems[index].unit_price * cartItems[index].amount;
        }
      }
    });
    //get all categories
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

  //on add to cart button clicked
  public addToCart(product: Products) {
    console.log(product);
    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
      let currentProduct = this.cartService.usersCart[index];
      if (product.product_id === currentProduct.product_id) {
        isfound = true;
        currentProduct.amount++;
      }
    }
    if (!isfound) {
      this.cartService.usersCart.push(product);
    }
    this.cartService.total += product.unit_price;
    let observable = this.cartService.addToCart(product);
    observable.subscribe();
  }
  //on order clicked
  public onOrderClicked() {
    this.router.navigate(['/shipping-details']);
  }
  //show all products pipe
  public showAllProducts() {
    this.categoryID = 0;
  }
  //show catrgory products pipe
  public onCategoryClicked(id: number) {
    console.log(id);
    this.categoryID = id;
  }

  //delete item from customers cart
  public deleteItemFromCart(product: Products) {
    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
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
      }
    }
  }
}
