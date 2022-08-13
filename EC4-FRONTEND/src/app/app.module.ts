import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Para el manejo de rutas
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//Para hacer uso de los elementos de Angular Material
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
//Vista principal
import { CategoriaComponent } from './views/categoria/categoria.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { ProductoComponent } from './views/producto/producto.component';
//Dialogs
import { CatDialogComponent } from './views/categoria/cat-dialog/cat-dialog.component';
import { PrvDialogComponent } from './views/proveedor/prv-dialog/prv-dialog.component';
import { PrdDialogComponent } from './views/producto/prd-dialog/prd-dialog.component';
//Forms
import { CatFormComponent } from './views/categoria/cat-form/cat-form.component';
import { PrvFormComponent } from './views/proveedor/prv-form/prv-form.component';
import { PrdFormComponent } from './views/producto/prd-form/prd-form.component';


const routes: Routes = [
  {path: 'categoria', component: CategoriaComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'producto', component: ProductoComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ProveedorComponent,
    ProductoComponent,
    CatDialogComponent,
    PrvDialogComponent,
    PrdDialogComponent,
    CatFormComponent,
    PrvFormComponent,
    PrdFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
