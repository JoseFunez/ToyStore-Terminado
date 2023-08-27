import mongoose from "mongoose";
import { Productos } from "./products.model";


const schema = new mongoose.Schema<Productos>({
    idProduct: Number,
    name: String,
    brand: String,
    img: String,
    price: String,
    type: String,
    age: String,
    }
);
export const ProductsSchema = mongoose.model('products', schema);