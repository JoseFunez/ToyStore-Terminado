import { Request, Response } from "express"; 
import { AdminSchema } from "../model/administradores.schema";

export const login = async (req:Request, res:Response)=> {
    const usuario = await AdminSchema.findOne({usuario: req.body.usuario, password: req.body.password}, {password: false});
  if (usuario) {
    res.send({status: true, message: 'Login correcto', usuario});
  }
  else 
    res.send({status: false, message: 'Login incorrecto'});
  res.end();
}


export const getAdmin = (req: Request, res: Response) => {
    AdminSchema.findOne({id: req.params.id}).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error => console.error(error));
}

export const getAdmins = (req: Request, res: Response) => {
  AdminSchema.find().then(result=>{
      res.send(result);
      res.end();
  })
  .catch(error => console.error(error));
}

