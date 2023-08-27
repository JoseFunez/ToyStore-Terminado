import { Orders } from "./orders.model";

export interface Drivers { 
    _id?: string;
    id: number;
    nombre: string;
    phone: string;
    email: string;
    status: string;
    city: string;
    assing_orders: Array<Orders>;
}