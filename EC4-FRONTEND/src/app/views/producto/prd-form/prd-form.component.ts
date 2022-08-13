import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria';
import { Producto } from 'src/app/model/producto';
import { Proveedor } from 'src/app/model/proveedor';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { CatFormComponent } from '../../categoria/cat-form/cat-form.component';

@Component({
  selector: 'app-prd-form',
  templateUrl: './prd-form.component.html',
  styleUrls: ['./prd-form.component.css']
})
export class PrdFormComponent implements OnInit {

  //Creamos un objeto de nuestro modelo con la promesa de que tendrá un dato siempre
  producto!: Producto;
  //Acá lo mismo pero para las clases referenciadas en un array ya que obtendremos su listado
  categoria!: Categoria[];
  proveedor!: Proveedor[];

  constructor(
    //
    private dialogRef: MatDialogRef<CatFormComponent>,
    //Invocamos al service para hacer uso de sus funciones
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    //Se utiliza para llamar datos desde la tabla de origen
    @Inject(MAT_DIALOG_DATA) private data: Producto
  ) { }

  ngOnInit(): void {
    //Crea un objeto de nuestro modelo para almacenar los datos
    this.producto = new Producto();
    this.producto.idProducto=this.data.idProducto;
    this.producto.descripcion=this.data.descripcion;
    this.producto.stock=this.data.stock;
    this.producto.precio=this.data.precio;
    this.producto.estado=this.data.estado;

    //llamamos a los datos de nuestras foraneas
    this.categoriaService.listar().subscribe(data =>{
      this.categoria=data
    })

    this.proveedorService.listar().subscribe(data =>{
      this.proveedor=data
    })
  }

  //Hace función de crear y editar mediante una validación interna
  guardar(){
    if (this.producto != null && this.producto.idProducto != 0) {
      this.productoService.editar(this.producto).subscribe(()=>{
        return this.productoService.listar().subscribe(data=>{
          this.productoService.productoActualizar.next(data);
        })
      });
    }else{
      this.productoService.registrar(this.producto).subscribe(()=>{
        this.productoService.listar().subscribe(data=>{
          this.productoService.productoActualizar.next(data);
        })
      })
    }
    this.cancelar()
  }

  //Cierra la ventana y cancela el proceso
  cancelar(){
    this.dialogRef.close();
  }

}
