 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { Pelicula } from '../interfaces/products.interface';
import { Observable } from 'rxjs';

 @Injectable({providedIn: 'root'})
 export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>("http://localhost:3000/peliculas");

  }

 }
