import { Products } from "./companies.model";

export interface Productos extends Products {
    _id?: string;
    brand: string;
}