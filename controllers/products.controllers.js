import Product from '../models/Product.js';


export const createProducts = async (req, res) => {

    // Create a new product
    const { name, category, price, imgURL } = req.body;
    const newProduct = new Product({ name, category, price, imgURL });
    //save the product
    const productSaved = await newProduct.save()
    //send the product
    res.json(productSaved);
}

export const getProducts = async(req, res) => {
    const products = await Product.find();
    res.json(products);
}


export const getProductById = async (req, res) => {
const product = await Product.findById(req.params.productId);
res.status(200).json(product);
}

export const updateProduct = async (req, res) => {
const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{new: true});
res.status(204).json(updateProduct);
}

export const deleteProduct = async(req, res) => {
const { productId } = req.params;
await Product.findByIdAndDelete(productId);
res.status(204).json({message: 'Product deleted'});

}