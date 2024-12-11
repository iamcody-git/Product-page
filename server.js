import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './Config/db.js';
import productRoutes from './Routes/productRoutes.js';
import cors from 'cors'
import path from 'path'

dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000;

const __dirname = path.resolve()

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/Frontend/dist")))

}


app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on port ${port}`);
});

