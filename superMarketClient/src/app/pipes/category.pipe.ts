import { Pipe, PipeTransform } from '@angular/core';
import { Categories } from '../models/Categories';
import { Products } from '../models/Products';
import { ProductService } from '../services/products.service';

@Pipe({
  name: 'categoryPipe',
})
export class CategoryPipe implements PipeTransform {
  transform(products: Products[], id: number): any {
    if (id === 0) {
      return products;
    } else {
      return products.filter((product) => {
        return product.product_id === id;
      });
    }
  }
}
