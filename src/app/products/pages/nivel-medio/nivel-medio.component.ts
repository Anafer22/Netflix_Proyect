import { Component } from '@angular/core';
import { Pelicula, Products } from '../../interfaces/products.interface';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-nivel-medio',
  templateUrl: './nivel-medio.component.html',
  styles: [],
})
export class NivelMedioComponent {

//Utiliza un atributo de clase llamado pelicula
  public products: Pelicula[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('productos') ?? '')
  }

  goToHome(): void {
    this.router.navigate([`main/`]);
  }

  //Cuenta y devuelve la cantidad de productos en el arreglo products que tienen la clasificación específica proporcionada como argumento (rating).
  //Utiliza el método filter para seleccionar solo los elementos del arreglo products que tienen la clasificación específica (rating).
  //Utiliza el método reduce en el arreglo filtrado para contar la cantidad de elementos. La función de reducción toma dos argumentos:
  //count (el acumulador) y _ (el valor actual del arreglo que no se está utilizando en la función). La función de reducción simplemente
  //suma 1 al acumulador en cada iteración. El segundo argumento de reduce (0) es el valor inicial del acumulador.
  countByRating(rating: string) {
    return this.products
               .filter(product => product.rating && product.rating.includes( rating )) // Filtra los productos con la clasificación específica
               .reduce((count, _ ) => (count + 1), 0); // Reduce el arreglo filtrado a la cantidad de elementos
  }
  //Cuenta y devuelve la cantidad de productos en el arreglo products que tienen la fecha de adición específica proporcionada como
  //argumento (date). Es el mismo codigo que el anterior, pero enfocado en date_added.
  countByDate( date: string ){
    return this.products
               .filter(product => product.date_added && product.date_added.includes( date ))
               .reduce((count, _) =>(count + 1 ), 0);
  }
  //Cuenta y devuelve la cantidad de productos en el arreglo products que tienen el director específico proporcionado como argumento
  //(director). Es el mismo codigo que el anterior, solamente que enfocado en director.
  countProductsByDir(director: string) {
    return this.products
               .filter( product => product.director && product.director.includes( director ))
               .reduce((count, _) => (count + 1), 1);
  }
  //Cuenta y devuelve la cantidad de productos en el arreglo products que están etiquetados con la etiqueta específica proporcionada
  //como argumento (tag). Es el mismo codigo que el anterior, solamente que enfocado en listed_in
  countByTag(tag: string){
    return this.products
               .filter( product => product.listed_in && product.listed_in.includes( tag ) )
               .reduce((count, _) =>(count + 1), 1)
  }

  //Devuelve un arreglo de objetos que representan TV Shows con la duración mínima de temporadas, incluyendo solo las propiedades title y
  //duration. Se utiliza un metodo llamado minCantSeason el cual devuelve la cantidad minima de temporadas. Utiliza el método filter para
  //seleccionar solo los elementos del arreglo products que tienen el tipo 'TV Show'. .map Mapea los TV Shows filtrados a un nuevo
  //objeto que solo contiene las propiedades title y duration.
  getShowsWithMinSeasons(){
    const minCantSeasons = this.getMinCantSeasons(); // Obtiene la cantidad mínima de temporadas
    return this.products
               .filter( producto => producto.type == 'TV Show') // Filtra solo los productos de tipo 'TV Show'
               .filter( tvShow => tvShow.duration && tvShow.duration !== undefined ) // Filtra los TV Shows que tienen una duración definida
               .filter( tvShow => parseInt(tvShow.duration) === minCantSeasons) // Filtra los TV Shows con la duración mínima de temporadas
               .map( tvShow => (
                  {
                    title: tvShow.title,
                    duration: tvShow.duration
                  }
                )
               )
  }

  //Devuelve un arreglo de objetos que representan TV Shows con la duración maxima de temporadas, incluyendo solo las propiedades title
  //y duration. Es el mismo codigo que el anterior, solamente que enfocado a la duracion maxima
  //
  getShowsWithMaxTemp() {
    const maxCantSeasons = this.getMaxCantSeasons();
    return this.products
               .filter( producto => producto.type == 'TV Show')
               .filter( tvShow => tvShow.duration && tvShow.duration !== undefined )
               .filter( tvShow => parseInt(tvShow.duration) === maxCantSeasons)
               .map( tvShow => (
                  {
                    title: tvShow.title,
                    duration: tvShow.duration
                  }
                )
               )
  }

  //Devuelve un arreglo de películas que tienen la duración mínima. getMinDuration proporciona la duración mínima deseada.
  //Utiliza el método filter para seleccionar solo los elementos del arreglo products que tienen el tipo 'Movie'.
  getMoviesWithMinDuration(){
    const minDuration = this.getMinDuration(); // Obtiene la duración mínima
    return this.products
               .filter( producto => producto.type == 'Movie') // Filtra solo los productos de tipo 'Movie'
               .filter( movie => movie.duration && movie.duration !== undefined ) // Filtra las películas que tienen una duración definida
               .filter( movie => parseInt(movie.duration) === minDuration) // Filtra las películas con la duración mínima
  }
  //Realiza la misma accion que el anterior, solamente que devuelve un arreglo con la duracion maxima y
  //Mapea las películas filtradas a un nuevo objeto que solo contiene las propiedades title y duration.
  getMoviesWithMaxDuration(){
    const maxDuration = this.getMaxDuration();
    return this.products
               .filter( producto => producto.type == 'Movie')
               .filter( movie => movie.duration && movie.duration !== undefined )
               .filter( movie => parseInt(movie.duration) === maxDuration)
               .map( movie => (
                  {
                    title: movie.title,
                    duration: movie.duration
                  }
                )
               )
  }

  //Calcula la duración mínima entre las películas (Movies). Utiliza el método filter para seleccionar solo las películas (Movies) que
  //tienen el tipo 'Movie'. Utiliza el método map para extraer el primer componente numérico de la duración de cada película.
  //Convierte este componente a un número entero usando parseInt.
  private getMinDuration(){
    return Math.min(
      ...this.products
          .filter( movie => movie.type == 'Movie' && movie.duration && movie.duration.split(' ').length > 1)
          .map( movie => parseInt(movie.duration.split(' ')[0]))
    )
  }

  //Realiza la misma accion que el anterior, pero enfocado a la duracion maxima.
  private getMaxDuration(){
   return Math.max(
      ...this.products
          .filter( movie => movie.type == 'Movie' && movie.duration && movie.duration.split(' ').length > 1)
          .map( movie => parseInt(movie.duration.split(' ')[0]))
    )
  }

  //Calcula la cantidad máxima de temporadas entre los programas de televisión (TV Shows). Utiliza el método filter para seleccionar solo
  // los programas de televisión (TV Shows) que tienen el tipo 'TV Show'. Utiliza el método map para extraer el primer componente numérico
  //de la duración de cada programa de televisión. Convierte este componente a un número entero usando parseInt.
   private getMaxCantSeasons(){
    return (Math.max(
      ...this.products
          .filter( tvShows => tvShows.type == 'TV Show' && tvShows.duration && tvShows.duration.split(' ').length > 1)
          .map( tvShows => parseInt(tvShows.duration.split(' ')[0]))
      )
    )
  }

  //Realiza la misma accion que el anterior, solamente que enfocado a la cantidad minima
  private getMinCantSeasons(){
    return (Math.min(
      ...this.products
          .filter( tvShows => tvShows.type == 'TV Show' && tvShows.duration && tvShows.duration.split(' ').length > 1)
          .map( tvShows => parseInt(tvShows.duration.split(' ')[0]))
      )
    )
  }
}
