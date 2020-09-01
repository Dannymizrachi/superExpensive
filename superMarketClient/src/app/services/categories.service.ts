import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/Categories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: Categories[];
  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('http://localhost:3000/categories');
  }
}
