//const mongoose = rquire('mongoose');
import mongoose from "mongoose";

const bd:string = 'toystore';
const port:string = '27017';
const host:string = '0.0.0.0';

export class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose
        .connect(`mongodb://${host}:${port}/${bd}`)
        .then(resut=>console.log('se conecto a mongoDB'))
        .catch(error=>console.log(error));
    }
}