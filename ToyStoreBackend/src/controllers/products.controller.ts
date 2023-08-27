import { Request, Response } from "express"; 
import { ProductsSchema } from "../model/products.schema";

//obtener los productos
export const getProducts = (req:Request, res:Response)=> {
    ProductsSchema.find()
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//obtener un producto
export const getProduct = (req:Request, res:Response)=> {
    ProductsSchema.find({idProduct: req.params.idProduct}).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//agregar un producto
export const addProduct = (req:Request, res:Response)=> {
    const p = new ProductsSchema(
        {
            idProduct: req.body.idProduct,
            name: req.body.name,
            brand: req.body.brand,
            img: req.body.img,
            price: req.body.price,
            type: req.body.type,
            age: req.body.age
        });
          p.save().then(saveResponse=>{
            res.send({message:'se agrego el producto', saveResponse});
            res.end();
          }).catch(error=>{
            res.send({message:'hubo un error al guardar el nuevo producto: ', error});
            res.end();
          });
}

//editar un producto
export const updateProduct = (req:Request, res:Response)=> {
    ProductsSchema.updateOne({idProduct: req.params.idProduct}, 
      {
        idProduct: req.body.idProduct,
        name: req.body.name,
        brand: req.body.brand,
        img: req.body.img,
        price: req.body.price,
        type: req.body.type,
        age: req.body.age
      }).then(updateResponse=>{
        res.send({message:'producto actualizado',updateResponse});
        res.end();
      }).catch(error=>{
        res.send({message:'hubo un error al actualizar el producto', error});
        res.end();
      });
}

//eliminar un producto
export const deleteProduct = async (req:Request, res:Response)=> {
    ProductsSchema.deleteOne({idProduct: req.params.idProduct})
    .then(removeResult=>{
        res.send({message:'producto eliminado: ', removeResult});
        res.end();
    });
}