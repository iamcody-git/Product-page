import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './Config/db.js';
import Product from './Models/productModel.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on port ${port}`);
});

app.post('/api/products', async(req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
        
    }    
});

app.delete('/api/products/:id', async(req, res) => {    
    const {id} = req.params.id;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        res.status(400).json({success: false, message: 'product not found'});
    }
});

app.get('/api/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

app.patch('/api/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(400).json({success: false, message: 'product not found'});
    }
});