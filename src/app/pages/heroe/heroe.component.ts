import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // Propiedades
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Con el route ya podemos obtener el argumento que estamos recibiendo por el url
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id)
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {

    // Si el form es invalido, retornamos un msg en consola
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    // Si el heroe tiene un id
    if (this.heroe.id) {
      // Actualizamos
      // Almacenamos lo que es la referencia a la peticion
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      // Creamos
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    // No importa si actualizamos o creamos todo lo tenemos en la peticion
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success',
      });
    });

  }

}
