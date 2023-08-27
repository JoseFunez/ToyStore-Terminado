import mongoose from "mongoose";
import { Drivers } from "./drivers.model";
import { Orders } from "./orders.model";


const schema = new mongoose.Schema<Drivers>({
    id: Number,
    nombre: String,
    phone: String,
    email: String,
    status: String,
    city: String,
    assing_orders: Array<Orders>
    }
);
export const DriversSchema = mongoose.model('drivers', schema);