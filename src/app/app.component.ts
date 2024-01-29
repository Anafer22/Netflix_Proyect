import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ProductService } from './products/services/product.service';
import { Global } from './products/constants/products.constants';
import { Pelicula } from './products/interfaces/products.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipes-app';

  constructor(private primeNGConfig: PrimeNGConfig ) {}
  onInit() {
    this.primeNGConfig.ripple = true;
  }
}
