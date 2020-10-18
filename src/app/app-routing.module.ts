import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

// Este modulo sera el encargado de manejar mis rutas

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' } // Cualquier otra ruta redireccionara a 'heroes'
];

@NgModule({
  imports: [
    // Este va a ser el archivo de rutas principal y mando mis routes
    RouterModule.forRoot(routes)
  ],
  // Si queremos que esta conf de routes se pueda usar en otro modulo o de manera global, hay que exportarlo
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
