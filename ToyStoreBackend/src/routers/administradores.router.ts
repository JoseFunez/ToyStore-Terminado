import express from 'express';
import { getAdmin, getAdmins, login } from '../controllers/administradores.controller';

const router = express.Router();

//hacer el login
router.post("/login", login);
//obtener un administrador
router.get("/:id", getAdmin);
//obtener administradores
router.get("/", getAdmins);



export default router;