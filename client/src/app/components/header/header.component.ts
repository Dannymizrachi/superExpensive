import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/Products';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { UploadService } from 'src/app/services/uplaods.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
  public imageExists: boolean;
  title = 'UploadFileExample';
  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef;

  public files = [];
  public uploadedImageName;
  public uniqueImgId: string;

  constructor(
    usersService: UserService,
    public categoriesService: CategoriesService,
    private router: Router,
    private productService: ProductService,
    private uploadService: UploadService
  ) {
    this.userLoginDetails = new UserLoginDetails();
    this.addProducts = new Products();
    this.usersService = usersService;
    this.showModal = false;
  }

  public onLogoClicked() {
    this.router.navigate(['/home']);
  }
  //login section
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

  //add product in admin mode

  public addProduct() {
    console.log(this.productService.products);

    this.addProducts.product_name = this.name.value;
    this.addProducts.unit_price = this.price.value;
    this.addProducts.category_name = this.category.value;
    this.addProducts.description = this.description.value;
    this.addProducts.img_src = this.uniqueImgId;

    let observable = this.productService.addProduct(this.addProducts);
    observable.subscribe();
    console.log(this.addProducts);
    this.showModal = false;

    let productsObservable = this.productService.getAllProducts();
    productsObservable.subscribe(
      (productsList) => {
        this.productService.products = productsList;
      },
      (error) => {
        alert('Failed to get Products ' + JSON.stringify(error));
      }
    );
  }
  //sign out function
  public signOut() {
    this.usersService.userIsAdmin = false;
    sessionStorage.removeItem('LoginToken');
    this.usersService.isNotLoggedIn = true;
    this.usersService.userType = '';
    this.router.navigate(['/home']);
  }

  //open modal to add product
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
    this.usersService.userIsAdmin = false;
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

  //on image upload click
  onClick() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log('Uploaded file :' + file);
        this.files.push({
          name: file.name,
          data: file,
          inProgress: false,
          progress: 0,
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';

    console.log('Amount of files to upload : ' + this.files.length);
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  //upload image file to the server
  uploadFile(file) {
    this.imageExists = true;
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    let observable = this.uploadService.upload(formData);
    observable.pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round((event.loaded * 100) / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })
    );

    observable.subscribe((event: any) => {
      if (typeof event === 'object' && event.body) {
        this.uniqueImgId = event.body.name;
        this.uploadedImageName =
          'http://localhost:3000/uploads/' + event.body.name;
      }
    });
  }
}
