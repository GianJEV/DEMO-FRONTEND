import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prd-dialog',
  templateUrl: './prd-dialog.component.html',
  styleUrls: ['./prd-dialog.component.css']
})
export class PrdDialogComponent implements OnInit {

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
