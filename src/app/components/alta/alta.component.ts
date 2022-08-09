import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioServiceService } from 'src/app/services/formulario-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  formulario: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formularioService: FormularioServiceService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      fecha_inscripcion: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      costo: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  guardarFormulario(){
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
    let formulario = {
      nombre: this.formulario?.value.nombre,
      edad: this.formulario?.value.edad,
      fecha_nacimiento: this.formulario?.value.fecha_nacimiento,
      fecha_inscripcion: this.formulario?.value.fecha_inscripcion,
      costo: this.formulario?.value.costo,
    }
    this.formularioService.addFormulario(formulario).subscribe(data =>{
      console.log(data)
    })
    //console.log('Formulario', this.calcularEdad(this.formulario?.value.fecha_nacimiento))
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

}
