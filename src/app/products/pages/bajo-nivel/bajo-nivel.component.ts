import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/products.interface';
import { ProductService } from '../../services/product.service';

import { Router } from '@angular/router';


@Component({
  selector: 'products-bajo-nivel',
  templateUrl: './bajo-nivel.component.html',
  styles: [
  ]
})
export class BajoNivelComponent implements OnInit {
//Utiliza un atributo de clase llamado pelicula
  public products: Pelicula[] = [];

  constructor(
    private router: Router
    ){}

  goToHome(): void{
    this.router.navigate([`main/`])
  }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productos') ?? '')
  }
  //Metodo que devuelve la cantidad de identificadores,
  //devuelve la cantidad total de elementos en el arreglo products más 1
  //La propiedad llamada products utiliza un atributo de clase llamado pelicula
  //la cual contiene un arreglo, se utiliza reduce para reducir a un solo valor
  getCantIds(): number {
    return this.products.reduce((count, _) => count + 1, 1);
  }

  //Se encarga de contar  los elementos del arreglo products cuyo atributo type es = Movie
  //Utiliza el método filter para seleccionar solo los elementos del arreglo products
  //que tienen un atributo type igual a 'Movie'.
  //Esto crea un nuevo arreglo que contiene solo las películas.
  //se utiliza reduce para reducir a un solo valor
  getCantMovies(): number {
    return this.products
               .filter( producto => producto.type == 'Movie')
               .reduce((count, _) => count + 1, 1)
  }

  //Cuenta y devuelve la cantidad de elementos en el arreglo products que tienen un
  // atributo type igual a 'TV Show'. Realiza la misma accion que la anterior funcion
  getCantTvShow(): number {
    return this.products
               .filter( producto => producto.type == 'TV Show')
               .reduce((count, _) => count + 1, 1)
  }

  //Cuenta y devuelve la cantidad de elementos en el arreglo products que tienen el atributo director definido
  //Utiliza el método filter para seleccionar solo los elementos del arreglo products que tienen el atributo director
  //se utiliza reduce para reducir a un solo valor
  getCantDirectors(): number {
    return this.products
               .filter( producto => producto.director )
               .reduce((count, _) => count + 1, 1);
  }

  //Cuenta y devuelve la cantidad de elementos en el arreglo products que tienen el atributo cast
  //Realiza la misma accion que el codigo anterior, solamente que para el cast
  getCantProductsWithCast(): number {
    return this.products
               .filter( producto => producto.cast )
               .reduce((count, _) => count + 1, 1);
  }

  //Cuenta y devuelve la cantidad de elementos en el arreglo products que tienen el atributo country igual al país pasado como argumento.
  //filter para seleccionar solo los elementos del arreglo products que tienen el atributo country igual al país pasado como argumento
  //(country). Esto crea un nuevo arreglo que contiene solo los productos que pertenecen al país especificado.
  //Se utiliza reduce para reducir a un solo valor. Toma dos argumentos: count (el acumulador) y
  //_ (el valor actual del arreglo que no se está utilizando en la función). La función de reducción simplemente suma 1 al acumulador
  //en cada iteración. El segundo argumento de reduce (1) es el valor inicial del acumulador.
  getCantProductsByCountry(country: string): number {
    return this.products
               .filter( producto => producto.country == country )
               .reduce((count, _) => count + 1, 1);
  }
  //Devuelve el año en el que hay más peliculas o programas de tv lanzados, según la información de años de lanzamiento.
  //Utiliza el método map para extraer los años de lanzamiento (release_year) de los productos. Esto crea un nuevo arreglo con los años.
  //Utiliza el método reduce para contar la cantidad de productos por año. Se crea un objeto (count) donde las claves son los años y
  // los valores son la cantidad de productos lanzados en ese año.
  // Utiliza otro reduce para encontrar el año con la mayor cantidad de productos. max es un arreglo que mantiene el año con la mayor
  //cantidad y la cantidad misma.
  getYearWithMoreProducts(): number {
    return Object.entries(this.products
      .map(product => product.release_year) // Extrae los años de lanzamiento de los productos
      .reduce((count, year) => {
        count[year] = (count[year] || 0) + 1; // Cuenta la cantidad de productos por año
        return count;
      }, {} as { [key: number]: number }) )// Inicializa un objeto para contar los productos por año
      .reduce((max, [year, count]) => (count > max[1] ? [Number(year), count] : max),
      [0, 0]
    )[0];
  }

  // devuelve la clasificación que aparece con mayor frecuencia entre el rating.
  // Es un codigo realmente parecido al anterior, solamente que es enfocado al rating.
  getClassificationWithMoreProducts(): string{
      return Object.entries(this.products
        .map(product => product.rating)
        .reduce((count, rating:string) => {
          count[rating] = (count[rating] || 0) + 1;
          return count;
        }, {} as { [key: string]: number })).reduce(
        (max, [rating, count]) => (count > max[1] ? [String(rating), count] : max),
        ['', 0]
      )[0];
  }
}
