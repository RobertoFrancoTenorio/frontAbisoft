import { Component } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pruebaAbisoft';
  constructor(
    private router: Router
  ){

  }

  goToAlta(){
    console.log('Hola')
    this.router.navigate(['alta']);
  }
}
