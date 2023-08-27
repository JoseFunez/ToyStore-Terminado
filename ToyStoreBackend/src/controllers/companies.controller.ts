import { Request, Response } from "express"; 
import { CompaniesSchema } from "../model/companies.schema";

//obtener las compañias
export const getCompanies = (req:Request, res:Response)=> {
    CompaniesSchema.find()
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//obtener una compañia
export const getCompany = (req:Request, res:Response)=> {
    CompaniesSchema.find({id: req.params.id}).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

//agregar una compañia
export const addCompany = (req:Request, res:Response)=> {
    const p = new CompaniesSchema(
        {
            id: req.body.id,
            name: req.body.name,
            logo: req.body.logo,
            products_in_stock: req.body.products_in_stock,
            corporate_number: req.body.corporate_number,
            corporate_email: req.body.corporate_email,
        });
          p.save().then(saveResponse=>{
            res.send({message:'se agrego la compañia', saveResponse});
            res.end();
          }).catch(error=>{
            res.send({message:'hubo un error al guardar la nueva compañia: ', error});
            res.end();
          });
}

//editar una compañia
export const updateCompany = (req:Request, res:Response)=> {
    CompaniesSchema.updateOne({id: req.params.id}, 
      {
        id: req.body.id,
        name: req.body.name,
        logo: req.body.logo,
        products_in_stock: req.body.products_in_stock,
        corporate_number: req.body.corporate_number,
        corporate_email: req.body.corporate_email,
      }).then(updateResponse=>{
        res.send({message:'Compañia actualizada',updateResponse});
        res.end();
      }).catch(error=>{
        res.send({message:'hubo un error al actualizar la compañia', error});
        res.end();
      });
}

//eliminar una compañia
export const deleteCompany = (req:Request, res:Response)=> {
    CompaniesSchema.deleteOne({id: req.params.id})
    .then(removeResult=>{
        res.send({message:'Compañia eliminada: ', removeResult});
        res.end();
    });
}