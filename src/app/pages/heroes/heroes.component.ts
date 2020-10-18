import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Propiedades
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    // Cuando cargando sea true mostramos el loading
    this.cargando = true;
    // Llamamos el metodo para traer la info de los heroes
    this.heroesService.getHeroes()
    // Y para que esto se dispare llamamos el subscribe
    .subscribe( resp => {
      this.heroes = resp;
      // Cuando ya tenemos la info quitamos el loading, por eso lo ponemos dentro del subscribe
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¿Borrar?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      // Dependiendo de lo que la persona responda, lo borramos o no
      if (resp.value) {
        // Si es true, primero lo borramos del arreglo y despues desde el servicio
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });

  }

}
