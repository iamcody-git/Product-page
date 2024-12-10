import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './Config/db.js';
import productRoutes from './Routes/productRoutes.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on port ${port}`);
});

