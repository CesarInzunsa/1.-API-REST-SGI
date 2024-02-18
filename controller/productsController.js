const Product = require('../model/product');
const { json } = require("express");
let products = [
    {
        id: 1,
        name: 'Scoter',
        description: 'Divertidos scoters',
        price: 3000.00,
        stock: 30
    },
    {
        id: 2,
        name: 'Gancito',
        description: 'El mejor producto del mundo',
        price: 17000.99,
        stock: 45
    },
    {
        id: 3,
        name: 'Cargador',
        description: 'Cargador de celular',
        price: 1000.99,
        stock: 40
    }
]

function getAllProducts() {
    try {
        if (Product.isEmpty(products)) {
            return { status: 404, message: 'There are no products yet' };
        } else {
            return { status: 200, data: products };
        }
    } catch (error) {
        console.error('Error getting prodcuct:', error);
        return { status: 500, message: 'Internal server error while getting the products.' };
    }
}

function createProduct(name, description, price, stock) {
    try {

        if (!Product.isParamsValid(name, description, price, stock)) {
            return {
                status: 400,
                message: 'The product was not created because the parameters are invalid, missing or are empty.'
            };
        }

        const newProduct = new Product(products.length + 1, name, description, price, stock);
        products.push(newProduct);
        return { status: 201, data: newProduct };
    } catch (error) {
        console.error('Error creating the product:', error);
        return { status: 500, message: 'Internal server error while creating the product.' };
    }
}

function getProductById(id) {
    try {
        const product = Product.getProductById(products, id);
        if (!product) {
            return { status: 404, message: `product not found by id: ${id}` };
        } else {
            return { status: 200, productById: product };
        }
    } catch (error) {
        console.error('Error getting a product by id.', error);
        return { status: 500, message: 'Internal server error while getting a product by id.' };
    }
}

function getProductByName(name) {
    try {
        const productByName = products.find(product => product.name === name);
        if (!productByName) {
            return { status: 404, message: `Product not found by name: ${name}` };
        } else {
            return { status: 200, productByName };
        }
    } catch (error) {
        console.error('Error getting a product by name.', error);
        return { status: 500, message: 'Internal server error while getting a product by name.' };
    }
}

function deleteProductById(id) {
    try {
        const product = Product.getProductById(products, id);

        if (!product) {
            return { status: 404, message: `The product was not deleted because it was not found by id: ${id}` };
        } else {
            products = products.filter(p => p.id !== parseInt(id));
            return { status: 200, deletedProduct: product };
        }
    } catch (error) {
        console.error('Error deleting a product by id.', error);
        return { status: 500, message: 'Internal server error while deleting a product by id.' };
    }
}

function updateProductById(newProduct) {
    try {
        const product = Product.getProductById(products, newProduct.id);

        if (!product) {
            return { status: 404, message: `Product not found by id: ${id}` };
        }

        if (!Product.isParamsValid(newProduct.name, newProduct.description, newProduct.price, newProduct.stock)) {
            return {
                status: 400,
                message: 'The product was not updated because the parameters are invalid, missing or are empty.'
            };
        }
        product.name = newProduct.name;
        product.description = newProduct.description;
        product.price = newProduct.price;
        product.stock = newProduct.stock;
        return { status: 200, productUpdated: product };
    } catch (error) {
        console.error('Error updating a task by id.', error);
        return { status: 500, message: 'Internal server error while updating a task by id.' };
    }
}

function getTotalInventoryValue() {
    try {
        const totalInventoryValue = Product.getTotalInventoryValue(products);

        if (totalInventoryValue == 0) {
            return { status: 404, message: 'It was not possible to calculate the total inventory value because there are no products.' };
        } else {
            return { status: 200, totalInventoryValue };
        }

    } catch (error) {
        console.error('Error getting the total inventory value.', error);
        return { status: 500, message: 'Internal server error while getting the total inventory value.' };
    }
}

function getProductsSortedByPrice(order) {
    try {

        if (order !== 'ASC' && order !== 'DESC') {
            return { status: 400, message: 'The order parameter is invalid, missing or is empty.' };
        }

        const productsSortedByPrice = Product.getProductsSortedByPrice(products, order.toUpperCase());

        if (productsSortedByPrice.length === 0) {
            return { status: 404, message: 'It was not possible to sort the products by price because the inventory is empty.'};
        }

        return { status: 200, productsSortedByPrice };
    } catch (error) {
        console.error('Error getting the products sorted by price.', error);
        return { status: 500, message: 'Internal server error while getting the products sorted by price.' };
    }
}

function getProductsFilteredByStock(stock) {
    try {

        if (!Product.isStockValid(stock)) {
            return { status: 400, message: 'The stock parameter is invalid, missing or is empty.' };
        }
        const productsFilteredByStock = Product.getProductsFilteredByStock(products, parseInt(stock));
        return { status: 200, productsFilteredByStock };
    } catch (error) {
        console.error('Error getting the products filtered by stock.', error);
        return { status: 500, message: 'Internal server error while getting the products filtered by stock.' };
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    getProductByName,
    deleteProductById,
    updateProductById,
    getTotalInventoryValue,
    getProductsSortedByPrice,
    getProductsFilteredByStock
}