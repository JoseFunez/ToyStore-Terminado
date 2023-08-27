import mongoose from "mongoose";
import { Administardores } from "./administradores.model";


const schema = new mongoose.Schema<Administardores>({
        id: Number,
        usuario: String,
        password: String
    }
);
export const AdminSchema = mongoose.model('administradores', schema);