import mongoose from "mongoose";
import { Companies, Products } from "./companies.model";


const schema = new mongoose.Schema<Companies>({
    id: Number,
    name: String,
    logo: String,
    products_in_stock: Array<Products>,
    corporate_number: String,
    corporate_email: String,
    }
);
export const CompaniesSchema = mongoose.model('companies', schema);