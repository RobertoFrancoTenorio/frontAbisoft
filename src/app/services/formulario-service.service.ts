import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormularioServiceService {

  url: string = "http://localhost:8000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json'
    })
  }
  constructor(
    private HttpClient: HttpClient
  ) { }

  listFormulario(){
    return this.HttpClient.get(this.url + '/api/formularios')
  }

  addFormulario(formulario: any){
    console.log(formulario)
    return this.HttpClient.post<any>(this.url + '/api/formulario', formulario, this.httpOptions)
  }

  eliminar(id: any){
    return this.HttpClient.delete<any>(this.url + '/api/formulario/' + id, this.httpOptions)
  }

  update(id: any, formulario: any){
    return this.HttpClient.put<any>(this.url + '/api/formulario/' + id, formulario, this.httpOptions)
  }
}
