const express = require('express');
const router = express.Router();
const productsController = require('../controller/productsController')
const authUtils = require('../middleware/authUtils');
const Product = require('../model/product');

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const decodedToken = authUtils.verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    req.user = decodedToken;
    next();
};

// ------------------- PRODUCTS ROUTES ------------------- //

// 2.- Get all product
router.get('/', authenticate, (req, res) => {
    const products = productsController.getAllProducts();
    res.status(products.status).json(products);
});

// 1.- Create a product
router.post('/', authenticate, (req, res) => {
    const { name, description, price, stock } = req.body;
    const newProduct = productsController.createProduct(name, description, price, stock)
    res.status(newProduct.status).json(newProduct);
});

// 6.- Get by name
router.get('/name/:name', authenticate, (req, res) => {
    const { name } = req.params;
    const productByName = productsController.getProductByName(name)
    res.status(productByName.status).json(productByName);
});

// 7.- Total inventory value
router.get('/inventory-value', authenticate, (req, res) => {
    const totalInventoryValue = productsController.getTotalInventoryValue();
    res.status(totalInventoryValue.status).json(totalInventoryValue);
});

// 8.- Get products sorted by price
router.get('/sorted-by-price', authenticate, (req, res) => {
    const { order } = req.query;
    const productsSortedByPrice = productsController.getProductsSortedByPrice(order);
    res.status(productsSortedByPrice.status).json(productsSortedByPrice);
});

// 9.- Get products filtered by stock
router.get('/stock/:stock', authenticate, (req, res) => {
    const { stock } = req.params;
    const productsFilteredByStock = productsController.getProductsFilteredByStock(stock);
    res.status(productsFilteredByStock.status).json(productsFilteredByStock);
});

// 3.- Get by id
router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const productById = productsController.getProductById(id)
    res.status(productById.status).json(productById);
});

// 4.- Update a product by id
router.put('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const newProduct = new Product(id, name, description, price, stock);
    const updateProductById = productsController.updateProductById(newProduct);
    res.status(updateProductById.status).json(updateProductById);
});

// 5.- Delete a product by id
router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const deletedProduct = productsController.deleteProductById(id);
    res.status(deletedProduct.status).json(deletedProduct);
});

module.exports = router;