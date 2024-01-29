import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/products.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel-alto',
  templateUrl: './nivel-alto.component.html',
  styles: [
  ]
})
export class NivelAltoComponent implements OnInit {

//Utiliza un atributo de clase llamado pelicula
  public products: Pelicula[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  goToHome(): void {
    this.router.navigate([`main/`])
  }
  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productos') ?? '')
  }

  //Devuelve un arreglo que contiene la fecha de adicción que tiene mas peliculas o series.
  //Utiliza el método map para extraer las fechas de adición de los productos.
  //Utiliza el método reduce para contar la cantidad de productos por fecha de adición.
  //Utiliza otro reduce para encontrar la fecha de adición que tiene más productos asociados.
  getDateMoreProducts() {
    return Object.entries(
      this.products
        .map(product => product.date_added) // Extrae las fechas de adición de los productos
        .reduce((count, date) => {
          count[date] = (count[date] || 0) + 1; // Cuenta la cantidad de productos por fecha de adición
          return count;
        }, {} as { [key: string]: number })) // Inicializa un objeto para contar los productos por fecha de adición
      .reduce(
        (max, [date, count]) => (
          count > max[1] ? [date, count] : max),
        [' ', 0]
      );
  }
  //Es el mismo codigo que el anterior, solamente que enfocado a el genero predominante (listed_in)
  getListInWithMoreProducts() {
    return Object.entries(
      this.products
        .map(product => product.listed_in)
        .reduce((count, date) => {
          count[date] = (count[date] || 0) + 1;
          return count;
        }, {} as { [key: string]: number }))
      .reduce(
        (max, [date, count]) => (
          count > max[1] ? [date, count] : max),
        [' ', 0]
      )[0];
  }

  //Devuelve la película que tiene la descripción más larga entre todos los productos que tienen descripciones definidas.
  //Utiliza la interfaz llamada Pelicula. Utiliza el método filter para seleccionar solo los productos que tienen una descripción
  // Utiliza el método reduce para encontrar la película con la descripción más larga. El parámetro max es el producto con la descripción
  //más larga encontrado hasta ese momento.
  //Compara la longitud de la descripción del producto actual con la longitud de la descripción del producto almacenado en max.
  //Si la descripción del producto actual es más larga, se devuelve el producto actual como nuevo max; de lo contrario,
  //se mantiene el max actual.
  getBiggerDescription(): Pelicula {
    return this.products
      .filter(product => product.description) // Filtra productos que tienen una descripción definida
      .reduce((max, product) => (
        product.description.length > max.description.length ? product : max
      )
      );
  }

  //Es el mismo codigo que el anterior, solamente que enfocado a la descripcion mas corta
  getSmallerDescription(): Pelicula {
    return this.products
      .filter(product => product.description)
      .reduce((min, product) => (
        product.description.length < min.description.length ? product : min
      )
      );

  }

  //Devuelve la cantidad de productos en el arreglo products que no tienen información de reparto.
  //Utiliza el método filter para seleccionar solo los productos que no tienen información de reparto (cast).
  //La condición !product.cast verifica que la propiedad cast esté falsy, es decir, que sea undefined, null, o false.
  //Utiliza el método reduce en el arreglo filtrado para contar la cantidad de productos que no tienen información de reparto.
  getProductsWithoutCast(): number {
    return this.products
      .filter(product => !product.cast)// Filtra productos que no tienen información de reparto
      .reduce((count, _) => count + 1, 1) // Reduce el arreglo filtrado a la cantidad de elementos
  }

  //Es el mismo codigo que el anterior, solamente que enfocado a los directores
  getProductsWithoutDirector(): number {
    return this.products
      .filter(product => !product.director)
      .reduce((count, _) => count + 1, 1)
  }

  //Devuelve la cantidad de productos en el arreglo products que tienen una fecha de adición dentro del rango de años especificado
  //(minYear a maxYear), 2002 a 2021.
  //Utiliza el método filter para seleccionar solo los productos que cumplen con ciertas condiciones relacionadas con la fecha de adición.
  //Utiliza el método reduce en el arreglo filtrado para contar la cantidad de productos que cumplen con las condiciones especificadas.
  getProductsInRangeDate(minYear: number, maxYear: number) {
    return this.products
      .filter(product =>
        product.date_added //Verifica que el producto tenga una fecha de adición definida.
        &&
        parseInt(product.date_added.split(' ')[2]) >= minYear// Convierte el año de la fecha de adición a un número entero y verifica que sea mayor o igual a minYear.
        &&
        parseInt(product.date_added.split(' ')[2]) <= maxYear//Convierte el año de la fecha de adición a un número entero y verifica que sea menor o igual a maxYear
      )
      .reduce((count, _) => count + 1, 1)
  }

  //Devuelve la cantidad de productos en el arreglo products cuyos títulos comienzan con la cadena especificada (str).
  //Utiliza el método filter para seleccionar solo los productos que cumplen con ciertas condiciones relacionadas con el título.
  //Utiliza el método reduce en el arreglo filtrado para contar la cantidad de productos cuyos títulos cumplen con las condiciones
  //especificadas.
  getProductsStartsWith(str: string) {
    return this.products
      .filter(product =>
        product.title //Verifica que el producto tenga un título definido.
        &&
        product.title.toString().startsWith(str) // Convierte el título a una cadena de texto y verifica que comience con la cadena especificada por el argumento str.
      )
      .reduce((count, _) => count + 1, 1)
  }

  //Devuelve la cantidad de productos en el arreglo products que son de tipo "Movie" y tienen al menos dos elementos específicos en la
  //propiedad listed_in, es decir, que contenga la clasificación Comedias y Dramas.
  //Utiliza el método filter para seleccionar solo los productos que cumplen con ciertas condiciones relacionadas con el tipo y la propiedad listed_in.
  //Utiliza el método reduce en el arreglo filtrado para contar la cantidad de productos que cumplen con las condiciones especificadas.
  getProductsWithTwoListedIn(listedIn1: string, listedIn2: string) {
    return this.products
      .filter(product =>
        product.type &&
        product.type.match('Movie') && // Verifica que el tipo sea "Movie"
        product.listed_in &&
        product.listed_in.includes(listedIn1) && // Verifica que el primer elemento esté en listed_in
        product.listed_in.includes(listedIn2) // Verifica que el segundo elemento esté en listed_in
      )
      .reduce((count, _) => count + 1, 1)
  }
  //Realiza la misma acción que el codigo anterior, solamente que enfocado a tres clasificaciones en vez de dos, a
  // International TV Shows, Romantic TV Shows y TV Comedies
  getProductsWithThree(listedIn1: string, listedIn2: string, listedIn3: string) {
    return this.products
      .filter(product =>
        product.type &&
        product.type.match('TV Show') &&
        product.listed_in &&
        product.listed_in.includes(listedIn1) &&
        product.listed_in.includes(listedIn2) &&
        product.listed_in.includes(listedIn3)
      )
      .reduce((count, _) => count + 1, 1)
  }
}
