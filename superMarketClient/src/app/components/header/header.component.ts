import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/Products';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public userLoginDetails: UserLoginDetails;
  public usersService: UserService;
  // public categoriesService: CategoriesService;
  public showModal: boolean;
  public addProducts: Products;
  public addProductDetailsForm: FormGroup;
  public name: FormControl;
  public price: FormControl;
  public category: FormControl;
  public description: FormControl;
  public userType: string;

  constructor(
    usersService: UserService,
    public categoriesService: CategoriesService,
    private router: Router,
    private productService: ProductService
  ) {
    this.userLoginDetails = new UserLoginDetails();
    this.addProducts = new Products();
    this.usersService = usersService;
    this.showModal = false;
  }

  public login() {
    let loginObservable = this.usersService.login(this.userLoginDetails);
    loginObservable.subscribe(
      (successfulLoginResponse) => {
        sessionStorage.setItem(
          'LoginToken',
          'Bearer ' + successfulLoginResponse.token
        );
        if (successfulLoginResponse.userType == 'CUSTOMER') {
          this.router.navigate(['/products']);
        }

        if (successfulLoginResponse.userType == 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        this.usersService.userType = successfulLoginResponse.userType;
        this.usersService.isUserLoggedIn();
      },
      (errorObject) => {
        alert(errorObject.error.error);
        console.log(errorObject.error.error);
      }
    );
  }

  public addProduct() {
    console.log(this.productService.products);

    this.addProducts.product_name = this.name.value;
    this.addProducts.unit_price = this.price.value;
    this.addProducts.category = this.category.value;
    this.addProducts.description = this.description.value;

    let observable = this.productService.addProduct(this.addProducts);
    observable.subscribe();
    console.log(this.addProducts);
    this.showModal = false;
  }
  public signOut() {
    sessionStorage.removeItem('LoginToken');
    this.usersService.isNotLoggedIn = true;
    this.usersService.userType = '';
    this.router.navigate(['/home']);
  }

  public openModalForAddProduct() {
    this.showModal = true;

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
  public closeModal() {
    this.showModal = false;
  }
  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.category = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);

    this.addProductDetailsForm = new FormGroup({
      name: this.name,
      price: this.price,
      category: this.category,
      description: this.description,
    });
    this.userType = this.usersService.userType;
  }
}
