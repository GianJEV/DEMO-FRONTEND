import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cat-dialog',
  templateUrl: './cat-dialog.component.html',
  styleUrls: ['./cat-dialog.component.css']
})
export class CatDialogComponent implements OnInit {

  constructor(
    public dialogref: MatDialogRef<Component>
  ) { }

  ngOnInit(): void {
  }

  //Confirma el proceso de eliminar
  onEliminar(){
    this.dialogref.close(true);
  }

  //Cancela la ejecución del eliminar
  onCancelar(){
    this.dialogref.close(false);
  }

}
