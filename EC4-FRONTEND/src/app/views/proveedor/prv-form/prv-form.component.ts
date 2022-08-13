import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { CatFormComponent } from '../../categoria/cat-form/cat-form.component';

@Component({
  selector: 'app-prv-form',
  templateUrl: './prv-form.component.html',
  styleUrls: ['./prv-form.component.css']
})
export class PrvFormComponent implements OnInit {

  //Creamos un objeto de nuestro modelo con la promesa de que tendrá un dato siempre
  proveedor!: Proveedor;

  constructor(
    //
    private dialogRef: MatDialogRef<CatFormComponent>,
    //Invocamos al service para hacer uso de sus funciones
    private proveedorService: ProveedorService,
    //Se utiliza para llamar datos desde la tabla de origen
    @Inject(MAT_DIALOG_DATA) private data: Proveedor
  ) { }

  ngOnInit(): void {
    //Crea,ps un objeto de nuestro modelo para almacenar los datos
    this.proveedor = new Proveedor();
    this.proveedor.idProveedor=this.data.idProveedor;
    this.proveedor.nombre=this.data.nombre;
    this.proveedor.contacto=this.data.contacto;
    this.proveedor.direccion=this.data.direccion;
    this.proveedor.telefono=this.data.telefono;
  }

  //Hace función de crear y editar mediante una validación interna
  guardar(){
    if (this.proveedor != null && this.proveedor.idProveedor != 0) {
      this.proveedorService.editar(this.proveedor).subscribe(()=>{
        return this.proveedorService.listar().subscribe(data=>{
          this.proveedorService.proveedorActualizar.next(data);
        })
      });
    }else{
      this.proveedorService.registrar(this.proveedor).subscribe(()=>{
        this.proveedorService.listar().subscribe(data=>{
          this.proveedorService.proveedorActualizar.next(data);
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
