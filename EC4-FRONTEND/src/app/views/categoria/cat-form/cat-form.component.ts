import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css']
})
export class CatFormComponent implements OnInit {

  //Creamos un objeto de nuestro modelo con la promesa de que tendrá un dato siempre
  categoria!: Categoria;

  constructor(
    //
    private dialogRef: MatDialogRef<CatFormComponent>,
    //Invocamos al service para hacer uso de sus funciones
    private categoriaService: CategoriaService,
    //Se utiliza para llamar datos desde la tabla de origen
    @Inject(MAT_DIALOG_DATA) private data: Categoria
  ) { }

  ngOnInit(): void {
    //Crea,ps un objeto de nuestro modelo para almacenar los datos
    this.categoria = new Categoria();
    this.categoria.idCategoria=this.data.idCategoria;
    this.categoria.nombre=this.data.nombre;
    this.categoria.descripcion=this.data.descripcion;
  }

  //Hace función de crear y editar mediante una validación interna
  guardar(){
    if (this.categoria != null && this.categoria.idCategoria != 0) {
      this.categoriaService.editar(this.categoria).subscribe(()=>{
        return this.categoriaService.listar().subscribe(data=>{
          this.categoriaService.categoriaActualizar.next(data);
        })
      });
    }else{
      this.categoriaService.registrar(this.categoria).subscribe(()=>{
        this.categoriaService.listar().subscribe(data=>{
          this.categoriaService.categoriaActualizar.next(data);
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
