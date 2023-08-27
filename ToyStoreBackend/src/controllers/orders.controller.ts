import { Request, Response } from "express"; 
import { OrdersSchema } from "../model/orders.schema";

//obtener las ordenes
export const getOrders = (req:Request, res:Response)=> {
    OrdersSchema.find()
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//obtener una orden
export const getOrder = (req:Request, res:Response)=> {
    OrdersSchema.find({id_order: req.params.id}).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//agregar una orden
export const addOrder = (req:Request, res:Response)=> {
    const p = new OrdersSchema(
        {
            id_order: req.body.id_order,
            location: req.body.location,
            distance_in_km: req.body.distance_in_km,
            estimated_time: req.body.estimated_time,
            total: req.body.total,
            city: req.body.city,
            driver: req.body.driver 
        });
          p.save().then(saveResponse=>{
            res.send({message:'se agrego la orden', saveResponse});
            res.end();
          }).catch(error=>{
            res.send({message:'hubo un error al guardar la nueva orden: ', error});
            res.end();
          });
}

//editar una orden
export const updateOrder = (req:Request, res:Response)=> {
    OrdersSchema.updateOne({id_order: req.params.id}, 
      {
        id_order: req.body.id_order,
        location: req.body.location,
        distance_in_km: req.body.distance_in_km,
        estimated_time: req.body.estimated_time,
        total: req.body.total,
        city: req.body.city,
        driver: req.body.driver 
      }).then(updateResponse=>{
        res.send({message:'orden actualizada',updateResponse});
        res.end();
      }).catch(error=>{
        res.send({message:'hubo un error al actualizar la orden', error});
        res.end();
      });
}

//eliminar una orden
export const deleteOrder = (req:Request, res:Response)=> {
    OrdersSchema.deleteOne({id_order: req.params.id})
    .then(removeResult=>{
        res.send({message:'orden eliminada: ', removeResult});
        res.end();
    });
}