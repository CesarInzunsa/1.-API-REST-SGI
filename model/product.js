class Product {
    constructor(id, name, description = '', price, stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    /**
     * Check if product list is empty.
     * @param {Array} products - The list of products.
     * @return {boolean} - True if list is empty, false otherwise.
     */
    static isEmpty(products) {
        return products.length === 0;
    }

    /**
     * Get a product by id.
     * @param {Array} products - The list of products.
     * @param {number} id - The id of the product to find.
     * @return {Object} - The product object if found, undefined otherwise.
     */
    static getProductById(products, id) {
        return products.find(product => product.id === parseInt(id));
    }

    /**
     * Get the total inventory value.
     * @param {Array} products - The list of products.
     * @return {number} - The total inventory value.
     */
    static getTotalInventoryValue(products) {
        return products.reduce((total, product) => total += (product.price * product.stock), 0);
    }

    /**
     * Get products sorted by price.
     * @param {Array} products - The list of products.
     * @param {string} order - The order of sorting ('ASC' or 'DESC').
     * @return {Array} - The list of products sorted by price.
     */
    static getProductsSortedByPrice(products, order = 'ASC') {
        if (order === 'DESC') {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products.sort((a, b) => a.price - b.price);
        }
    }

    /**
     * Get products filtered by stock.
     * @param {Array} products - The list of products.
     * @param {number} stock - The minimum stock to filter by.
     * @return {Array} - The list of products filtered by stock.
     */
    static getProductsFilteredByStock(products, stock) {
        return products.filter(product => product.stock >= stock);
    }

    /**
     * Validate product parameters.
     * @param {string} name - The name of the product.
     * @param {string} description - The description of the product.
     * @param {number} price - The price of the product.
     * @param {number} stock - The stock of the product.
     * @return {boolean} - True if parameters are valid, false otherwise.
     */
    static isParamsValid(name, description, price, stock) {
        return name && typeof name === 'string' && description && typeof description === 'string' && price && typeof price === 'number' && parseInt(price) > 0 && stock && typeof stock === 'number' && parseInt(stock) > 0;
    }

    /**
     * Validate product stock.
     * @param {number} stock - The stock of the product.
     * @return {boolean} - True if stock is valid, false otherwise.
     */
    static isStockValid(stock) {
        return stock && typeof parseInt(stock) === 'number' && parseInt(stock) > 0;
    }

}

module.exports = Product;