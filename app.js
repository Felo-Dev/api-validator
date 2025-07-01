import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';

import { createRoles } from './libs/initSteup.js';
import { createUser, getUsers, getUser, updateUser, deleteUser } from './controllers/user.controller.js';
import authRoute from './routes/auth.routes.js';

const app = express();
createRoles();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json("bienvenido a la nueva api");
});

// Usa SOLO el router de productos
app.use('/api/products', productsRoutes);

app.use('/api/auth', authRoute);

export default app;

