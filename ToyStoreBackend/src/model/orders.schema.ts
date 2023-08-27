import mongoose from "mongoose";
import { Orders } from "./orders.model";


const schema = new mongoose.Schema<Orders>({
    id_order: Number,
    location: String,
    distance_in_km: String,
    estimated_time: String,
    total: String,
    city: String,
    driver: String 
    }
);
export const OrdersSchema = mongoose.model('orders', schema);