import { Component, OnInit } from '@angular/core';
import { Router, Route, NavigationExtras } from '@angular/router';
import { FormularioServiceService } from 'src/app/services/formulario-service.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  formularios: any | undefined;
  list: any;
  constructor(
    private router: Router,
    private formularioService: FormularioServiceService
  ) { }

  ngOnInit(): void {
    this.formularios = this.formularioService.listFormulario().subscribe(formulario =>{
      this.formularios = formulario
      console.log('data', this.formularios.data)
      this.list = this.formularios.data
      
    })

  }

  goToAlta(){
    console.log('Hola')
    this.router.navigate(['alta']);
  }

  eliminar(id: any){
    this.formularioService.eliminar(id).subscribe(data =>{
      this.formularios = data
      console.log('data', this.formularios.data)
      this.list = this.formularios.data
    })
  }

  editar(formulario: any){


    const navigationExtras: NavigationExtras = {
      state: {
        formulario: formulario,
      }
    };
    this.router.navigate(['editar'], navigationExtras);
  }

}
