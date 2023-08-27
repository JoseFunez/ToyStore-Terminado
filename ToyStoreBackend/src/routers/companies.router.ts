import express from 'express';
import { addCompany, deleteCompany, getCompanies, getCompany, updateCompany } from '../controllers/companies.controller';


const router = express.Router();

//obtener compañias
router.get("/", getCompanies);
//obtener una compañia
router.get("/:id", getCompany);
//agregar compañia
router.post('/', addCompany);
//editar compañia
router.put('/:id', updateCompany);
//eliminar compañia
router.delete('/:id', deleteCompany);


export default router;