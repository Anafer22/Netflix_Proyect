import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Pelicula } from '../../interfaces/products.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-netflix-content',
  templateUrl: './netflix-content.component.html',
  styleUrls: ['./netflix-content.component.css']
})
export class NetflixContentComponent implements OnInit {

  public products : Pelicula[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.productService.getProducts()
        .subscribe(
          products => localStorage.setItem('productos', JSON.stringify( products ))
        );

    this.products = JSON.parse(localStorage.getItem('productos') ?? '')
  }

  goTo(nivel: string): void {
    this.router.navigate([`main/${nivel}`])
  }



}
