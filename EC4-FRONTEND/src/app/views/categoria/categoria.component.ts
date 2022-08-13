import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CatDialogComponent } from './cat-dialog/cat-dialog.component';
import { CatFormComponent } from './cat-form/cat-form.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  displayedColumns = ["idCategoria", "nombre", "descripcion", "acciones"];
  dataSource!: MatTableDataSource<Categoria>;

  constructor(
    //Obtenemos nuestras funciones CRUD de nuestro servicio
    private categoriaService: CategoriaService,
    //Para invocar el modelo de nuestro componente dialog
    private dialog: MatDialog
    ) { }

  //El suscribe es un observable para darse cuenta los cambios que ejecuta nuestra función
  ngOnInit(): void {
    //Para visualizar
    this.categoriaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
    //Para actualizar la data en tiempo real
    this.categoriaService.categoriaActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  onEliminar(id: number){
    let dialogRef = this.dialog.open(CatDialogComponent,{
    });
    dialogRef.afterClosed().subscribe(estado =>{
      if (estado) {
        this.categoriaService.eliminar(id).subscribe(()=>{
          this.categoriaService.listar().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
     
    })
  }

  abrirForm(categoria?: Categoria){
    let cat = categoria != null ? categoria: new Categoria();
    this.dialog.open(CatFormComponent,{
      width: '50%',
      height: '25%',
      data: cat
    })
  }

}
