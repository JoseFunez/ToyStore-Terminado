import express from 'express';
import { addDriver, deleteDriver, getDrivers, getDriver, updateDriver } from '../controllers/drivers.controller';


const router = express.Router();

//obtener motoristas
router.get("/", getDrivers);
//obtener un motorista
router.get("/:id", getDriver);
//agregar motorista
router.post('/', addDriver);
//editar motorista
router.put('/:id', updateDriver);
//eliminar motorista
router.delete('/:id', deleteDriver);


export default router;