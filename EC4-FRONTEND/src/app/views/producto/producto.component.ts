import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { PrdDialogComponent } from './prd-dialog/prd-dialog.component';
import { PrdFormComponent } from './prd-form/prd-form.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ["idProducto", "descripcion", "stock", "precio", "estado", "categoria", "proveedor", "acciones"];
  dataSource!: MatTableDataSource<Producto>;

  constructor(
    //Obtenemos nuestras funciones CRUD de nuestro servicio
    private productoService: ProductoService,
    //Para invocar el modelo de nuestro componente dialog
    private dialog: MatDialog
    ) { }

  //El suscribe es un observable para darse cuenta los cambios que ejecuta nuestra función
  ngOnInit(): void {
    //Para visualizar
    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
    //Para actualizar la data en tiempo real
    this.productoService.productoActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  onEliminar(id: number){
    let dialogRef = this.dialog.open(PrdDialogComponent,{
    });
    dialogRef.afterClosed().subscribe(estado =>{
      if (estado) {
        this.productoService.eliminar(id).subscribe(()=>{
          this.productoService.listar().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
     
    })
  }

  abrirForm(producto?: Producto){
    let prd = producto != null ? producto: new Producto();
    this.dialog.open(PrdFormComponent,{
      width: '50%',
      height: '60%',
      data: prd
    })
  }

}
