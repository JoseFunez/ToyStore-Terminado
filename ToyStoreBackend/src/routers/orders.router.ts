import express from 'express';
import {getOrders, getOrder, addOrder, updateOrder, deleteOrder } from '../controllers/orders.controller';


const router = express.Router();

//obtener ordenes
router.get("/", getOrders);
//obtener una orden
router.get("/:id", getOrder);
//agregar orden
router.post('/', addOrder);
//editar orden
router.put('/:id', updateOrder);
//eliminar orden
router.delete('/:id', deleteOrder);


export default router;