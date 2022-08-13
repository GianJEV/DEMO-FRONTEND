import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";

export class Producto {
    idProducto: number | undefined;
    descripcion: string | undefined;
    stock: number | undefined;
    precio: number | undefined;
    estado: string | undefined;

    categoria: Categoria = new Categoria;
    proveedor: Proveedor = new Proveedor;
}