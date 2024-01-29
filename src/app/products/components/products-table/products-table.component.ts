import { Component, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/products.interface';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styles: [
  ]
})
export class ProductsTableComponent {


  @Input()
  public data: Pelicula[] = [];

}
