import express from 'express';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../controllers/products.controller';

const router = express.Router();

//obtener productos
router.get("/", getProducts);
//obtener un producto
router.get("/:idProduct", getProduct);
//agregar producto
router.post('/', addProduct);
//editar producto
router.put('/:idProduct', updateProduct);
//eliminar producto
router.delete('/:idProduct', deleteProduct);


export default router;