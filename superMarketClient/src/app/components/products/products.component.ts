import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';
import { ProductService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/UserService';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/services/categories.service';
import { AppModule } from 'src/app/modules/app.module';

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
          console.log(productsList[index].total_price);
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

      this.cartService.updateTotal();
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
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    console.log(product);
    let isfound = false;
    for (let index = 0; index < this.cartService.usersCart.length; index++) {
      if (product.id === this.cartService.usersCart[index].id) {
        isfound = true;
        this.cartService.usersCart[index].amount++;
        product.total_price = this.cartService.usersCart[index].total_price;
      }
      console.log(product);
    }
    if (isfound == false) {
      this.cartService.usersCart.push(product);
    }
    this.addToCartModel.id = product.id;
    this.addToCartModel.amount = 1;

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
    this.deleteItem.id = product.id;
    this.deleteItem.amount = 1;
    const index = this.cartService.usersCart.indexOf(product);
    if (index > -1) {
      this.cartService.usersCart.splice(index, 1);
    }
    let observable = this.cartService.deleteItemFromCart(this.deleteItem);
    observable.subscribe();
  }
}
