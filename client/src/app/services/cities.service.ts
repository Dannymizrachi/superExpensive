import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cities } from '../models/Cities';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  public cities: Cities[];
  constructor(private http: HttpClient) {}
  public getAllCities(): Observable<Cities[]> {
    return this.http.get<Cities[]>('http://localhost:3000/cities');
  }
}
