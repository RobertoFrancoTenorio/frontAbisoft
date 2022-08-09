import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormularioServiceService } from 'src/app/services/formulario-service.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {
  idFormulario: any;
  id: any;
  formulario: FormGroup | undefined;

  constructor(
    private router: Router,
    private formularioService: FormularioServiceService,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      fecha_inscripcion: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      costo: ['', [Validators.required]],
    })
    console.log(this.router.getCurrentNavigation().extras);
    this.idFormulario = this.router.getCurrentNavigation().extras.state
    this.id = this.idFormulario.formulario
    console.log('id', this.id);
  }

  ngOnInit(): void {
    this.loadData()

  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  calcularEdad(fecha: string) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  sweetAlert(titulo: any, icono: any, mensaje: any, completado?: boolean){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icono,
      confirmButtonText: 'Continuar',
    }).then(() => {
      /* Read more about isConfirmed, isDenied below */
      if (completado) {
        this.router.navigate(['']);
      } else {
        Swal.fire('Corrige el formulario', '', 'info')
      } 
    })
  }

  editarFormulario(formulario:any){
    let fecha_inscripcion = this.formulario?.value.fecha_inscripcion;
    let fecha_nacimiento = this.formulario?.value.fecha_nacimiento;
    if(Date.parse(fecha_inscripcion) > Date.parse(fecha_nacimiento)){
      this.sweetAlert('Terminado', 'success', 'Formulario completado exitosamente', true)
    }
    else{
      this.sweetAlert('Error con la fecha', 'error', 'La fecha de inscripcion es mayor')
    }

    let edad = this.calcularEdad(this.formulario?.value.fecha_nacimiento);
    if(this.formulario?.value.edad == edad){
      this.sweetAlert('Terminado', 'success', 'Formulario completado exitosamente', true)
    }
    else{
      this.sweetAlert('Error con la edad', 'error', 'La edad no es correcta')
    }

    if((this.formulario?.value.edad > 18) || edad > 18){

    }
    else{
      this.sweetAlert('Error con la edad', 'error', 'La edad no es mayor que 18')
    }

    let tiempoApagar = this.calcularEdad(this.formulario?.value.fecha_inscripcion);
    let costo = tiempoApagar * this.calcularEdad(this.formulario?.value.costo)
    let formularioEditado = {
      nombre: this.formulario?.value.nombre,
      edad: this.formulario?.value.edad,
      fecha_nacimiento: this.formulario?.value.fecha_nacimiento,
      fecha_inscripcion: this.formulario?.value.fecha_inscripcion,
      costo: costo,
    }
    this.formularioService.update(this.id.id, formularioEditado).subscribe(data =>{
      console.log(data)
    })
  }

  loadData(){
    this.formulario?.patchValue({
      nombre: this.id.nombre,
      edad: this.id.edad,
      fecha_nacimiento: this.id.fecha_nacimiento,
      fecha_inscripcion: this.id.fecha_inscripcion,
      costo: this.id.costo,
    })
  }

}
