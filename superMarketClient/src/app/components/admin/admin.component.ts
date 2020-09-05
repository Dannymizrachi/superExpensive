import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { ProductService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/Products';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public showModal: boolean;
  public productForEdit: Products;

  public editProductDetailsForm: FormGroup;
  public name: FormControl;
  public price: FormControl;
  public category: FormControl;
  public description: FormControl;
  constructor(
    public usersService: UserService,
    public categoriesService: CategoriesService,
    public productService: ProductService
  ) {
    this.showModal = false;
    this.productForEdit = new Products();
  }

  ngOnInit(): void {
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

  public openModalForEdit(item: Products) {
    this.productForEdit = item;
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
    // console.log(item);

    this.name = new FormControl(`${this.productForEdit.product_name}`, [
      Validators.required,
    ]);
    this.price = new FormControl(`${this.productForEdit.unit_price}`, [
      Validators.required,
    ]);
    this.category = new FormControl(`${this.productForEdit.category}`, [
      Validators.required,
    ]);
    this.description = new FormControl(`${this.productForEdit.description}`, [
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

  public editProduct() {
    this.productForEdit.product_name = this.name.value;
    this.productForEdit.unit_price = this.price.value;
    this.productForEdit.category = this.category.value;
    this.productForEdit.description = this.description.value;
    this.productForEdit.product_id;
    console.log(this.productForEdit.product_id);

    let observable = this.productService.editProduct(this.productForEdit);
    observable.subscribe();
    console.log(this.productForEdit);
    this.showModal = false;
  }
}
