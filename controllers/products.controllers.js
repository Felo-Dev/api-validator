import Product from '../models/Product.js';


export const createProducts = async (req, res) => {
    const { name, category, price, imgURL } = req.body;
    const newProduct = new Product({ name, category, price, imgURL });
    const productSaved = await newProduct.save();
    res.json(productSaved);
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.status(200).json(updateProduct);
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};