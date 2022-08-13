import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { PrvDialogComponent } from './prv-dialog/prv-dialog.component';
import { PrvFormComponent } from './prv-form/prv-form.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  displayedColumns = ["idProveedor", "nombre", "contacto", "direccion", "telefono", "acciones"];
  dataSource!: MatTableDataSource<Proveedor>;

  constructor(
    //Obtenemos nuestras funciones CRUD de nuestro servicio
    private proveedorService: ProveedorService,
    //Para invocar el modelo de nuestro componente dialog
    private dialog: MatDialog
    ) { }

  //El suscribe es un observable para darse cuenta los cambios que ejecuta nuestra función
  ngOnInit(): void {
    //Para visualizar
    this.proveedorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
    //Para actualizar la data en tiempo real
    this.proveedorService.proveedorActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  onEliminar(id: number){
    let dialogRef = this.dialog.open(PrvDialogComponent,{
    });
    dialogRef.afterClosed().subscribe(estado =>{
      if (estado) {
        this.proveedorService.eliminar(id).subscribe(()=>{
          this.proveedorService.listar().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
     
    })
  }

  abrirForm(proveedor?: Proveedor){
    let prv = proveedor != null ? proveedor: new Proveedor();
    this.dialog.open(PrvFormComponent,{
      width: '50%',
      height: '45%',
      data: prv
    })
  }

}
