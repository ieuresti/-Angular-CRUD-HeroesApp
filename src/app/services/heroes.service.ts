import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroesapp-firebase.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {

    // Retornar info a la pag que llame este metodo
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      // El map recibiria la resp de la peticion
      map((resp: any) => {
        heroe.id = resp.name;
        // Regresa toda la instancia del heroe pero con su id
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      // El operador spread se va a encargar de tomar c/u de las propiedades heroe del heroe y crearse una propiedad con el mismo nombre
      ...heroe
    };

    // Como el obj(heroeTemp) ya no tiene la referencia de JavaScript podemos borrar la propiedad id con seguridad
    // esto con el fin de que en firebase no añada el id
    delete heroeTemp.id;

    // put para actualizar, si fuera post crearia uno nuevo
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  // Obtener un heroe por id
  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {

    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      // La idea aqui es que este map regrese lo que sea que retorne la funcion de crearArregloHeroes
      map(resp => this.crearArregloHeroes(resp), delay(2500))
    );
  }

  // Recibimos la respuesta que van a ser los heroes
  private crearArregloHeroes( heroesObj: object) {

    // Tomamos los obj que estamos recibiendo y transformarlos en un arreglo
    const heroes: HeroeModel[] = [];

    // Pequeña validacion por si no tenemos nada en heroesObj
    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach( key => {

      // Extraemos el obj y creamos una nueva referencia de tipo heroe
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      // Grabamos el objeto ya elaborado o el heroe al arreglo de heroes
      heroes.push(heroe);
    });
    // Retornamos ahora si el arreglo
    return heroes;
  }
}
