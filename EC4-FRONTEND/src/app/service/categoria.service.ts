import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaActualizar = new Subject<Categoria[]>();

  private url: string = "http://localhost:8090/api/categoria"

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Categoria[]>(this.url)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

  editar(categoria:Categoria){
    return this.http.put(this.url, categoria)
  }

  registrar(categoria:Categoria){
    return this.http.post(this.url, categoria)
  }

}
