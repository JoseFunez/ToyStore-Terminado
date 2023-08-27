import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import administradoresRouter  from './routers/administradores.router';
import CompaniesRouter from './routers/companies.router';
import productsRouter from './routers/products.router';
import driversRouter from './routers/drivers.router';
import ordersRouter from './routers/orders.router';


import { Database } from './utils/database';
import cors from 'cors';

dotenv.config();

const database:Database = new Database(); 
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); 


app.use('/administradores', administradoresRouter);
app.use('/companies', CompaniesRouter);
app.use('/products', productsRouter);
app.use('/drivers', driversRouter);
app.use('/orders', ordersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('el backend del proyectoo');
});

app.listen(port, () => {
  console.log(`⚡️servidor levantado http://localhost:${port}`);
  console.log('que onda mi ing');
});