
import express from 'express';
import morgan from 'morgan';

import { createRoles } from './libs/initSteup.js';
import { createProducts, getProducts, getProductById, updateProduct, deleteProduct } from './controllers/products.controllers.js';
import authRoute from './routes/auth.routes.js';

const app = express();
createRoles();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json("bienvenido a la nueva api");
});

app.post('/api/products', createProducts);
app.get('/api/products', getProducts);
app.get('/api/products/:productId', getProductById);
app.put('/api/products/:productId', updateProduct);
app.delete('/api/products/:productId', deleteProduct);

app.use('/api/auth', authRoute);
export default app;
