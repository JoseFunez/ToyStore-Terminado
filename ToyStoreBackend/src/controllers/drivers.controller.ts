import { Request, Response } from "express"; 
import { DriversSchema } from "../model/drivers.schema";

//obtener los conductores
export const getDrivers = (req:Request, res:Response)=> {
    DriversSchema.find()
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//obtener un conductor
export const getDriver = (req:Request, res:Response)=> {
    DriversSchema.find({id: req.params.id}).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//agregar un conductor
export const addDriver = (req:Request, res:Response)=> {
    const p = new DriversSchema(
        {
            id: req.body.id,
            nombre: req.body.nombre,
            phone: req.body.phone,
            email: req.body.email,
            status: req.body.status,
            city: req.body.city,
            assing_orders: req.body.assing_orders
        });
          p.save().then(saveResponse=>{
            res.send({message:'se agrego al motorista', saveResponse});
            res.end();
          }).catch(error=>{
            res.send({message:'hubo un error al guardar al nuevo motorista: ', error});
            res.end();
          });
}

//editar un conductor
export const updateDriver = (req:Request, res:Response)=> {
    DriversSchema.updateOne({id: req.params.id}, 
      {
            id: req.body.id,
            nombre: req.body.nombre,
            phone: req.body.phone,
            email: req.body.email,
            status: req.body.status,
            city: req.body.city,
            assing_orders: req.body.assing_orders
      }).then(updateResponse=>{
        res.send({message:'Motorista actualizado',updateResponse});
        res.end();
      }).catch(error=>{
        res.send({message:'hubo un error al actualizar al motorista', error});
        res.end();
      });
}

//eliminar un conductor
export const deleteDriver = (req:Request, res:Response)=> {
    DriversSchema.deleteOne({id: req.params.id})
    .then(removeResult=>{
        res.send({message:'Motorista eliminado: ', removeResult});
        res.end();
    });
}