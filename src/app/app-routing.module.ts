import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaComponent } from '../app/components/alta/alta.component';
import { EdicionComponent } from './components/edicion/edicion/edicion.component';
import { ListaComponent } from './components/lista/lista/lista.component';

const routes: Routes = [
  {
    path: 'alta', component: AltaComponent
  },
  {path: '', component: ListaComponent, pathMatch: 'full'},
  {path: 'editar', component: EdicionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
