import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoActualizar = new Subject<Producto[]>();

  private url: string = "http://localhost:8090/api/producto"

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Producto[]>(this.url)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

  editar(producto:Producto){
    return this.http.put(this.url, producto)
  }

  registrar(producto:Producto){
    return this.http.post(this.url, producto)
  }

}
