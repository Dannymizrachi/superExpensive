import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { ProductService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/Products';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { UploadService } from 'src/app/services/uplaods.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public showModal: boolean;
  public productForEdit: Products;
  public imageExists: boolean;
  title = 'UploadFileExample';
  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef;
  public uniqueImgId: string;
  public files = [];
  public uploadedImageName;
  public editProductDetailsForm: FormGroup;
  public name: FormControl;
  public price: FormControl;
  public category: FormControl;
  public description: FormControl;
  constructor(
    public usersService: UserService,
    public categoriesService: CategoriesService,
    public productService: ProductService,
    private uploadService: UploadService
  ) {
    this.showModal = false;
    this.productForEdit = new Products();
  }

  ngOnInit(): void {
    this.usersService.userIsAdmin = true;
    this.usersService.isUserLoggedIn();
    let observable = this.productService.getAllProducts();
    observable.subscribe(
      (productsList) => {
        this.productService.products = productsList;
      },
      (error) => {
        alert('Failed to get Products ' + JSON.stringify(error));
      }
    );
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
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  //upload file to the server
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

  //open modal for edit product
  public openModalForEdit(item: Products) {
    console.log(item);
    this.productForEdit.product_id = item.product_id;
    this.productForEdit.product_name = item.product_name;
    this.productForEdit.unit_price = item.unit_price;
    this.productForEdit.category_name = item.category_name;
    this.productForEdit.description = item.description;

    this.showModal = true;

    this.categoriesService.getAllCategories();
    let categoriesObservable = this.categoriesService.getAllCategories();
    categoriesObservable.subscribe(
      (categoryList) => {
        this.categoriesService.categories = categoryList;
        console.log(categoryList);
      },
      (error) => {
        alert('Failed to get Categories ' + JSON.stringify(error));
      }
    );

    this.name = new FormControl(`${item.product_name}`, [Validators.required]);
    this.price = new FormControl(`${item.unit_price}`, [Validators.required]);
    this.category = new FormControl(`${item.category_name}`, [
      Validators.required,
    ]);
    this.description = new FormControl(`${item.description}`, [
      Validators.required,
    ]);

    this.editProductDetailsForm = new FormGroup({
      name: this.name,
      price: this.price,
      category: this.category,
      description: this.description,
    });
  }
  public closeModal() {
    this.showModal = false;
  }

  public onDeleteProductClicked(product: Products) {
    try {
      console.log(product);
      let deleteProductObservable = this.productService.deleteProduct(product);
      deleteProductObservable.subscribe();

      let observable = this.productService.editProduct(this.productForEdit);
      observable.subscribe();

      let productsObservable = this.productService.getAllProducts();
      productsObservable.subscribe(
        (productsList) => {
          this.productService.products = productsList;
        },
        (error) => {
          alert('Failed to get Products ' + JSON.stringify(error));
        }
      );
    } catch (error) {
      alert('Failed to delete Product ' + JSON.stringify(error));
    }
  }

  //send the edited product the the server
  public editProduct() {
    this.productForEdit.product_name = this.name.value;
    this.productForEdit.unit_price = this.price.value;
    this.productForEdit.category_name = this.category.value;
    this.productForEdit.description = this.description.value;
    this.productForEdit.img_src = this.uniqueImgId;
    this.productForEdit.product_id;

    let observable = this.productService.editProduct(this.productForEdit);
    observable.subscribe();

    let productsObservable = this.productService.getAllProducts();
    productsObservable.subscribe(
      (productsList) => {
        this.productService.products = productsList;
      },
      (error) => {
        alert('Failed to get Products ' + JSON.stringify(error));
      }
    );

    this.showModal = false;
  }
}
