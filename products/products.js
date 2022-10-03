class Products{
    constructor(){
    this.products = [];
    }

    saveProduct(data){
        const newProduct = {
            name : data.name,
            price : data.price,
            url : data.url
        }
        this.products.push(newProduct)
    }

    getProducts(){
        return this.products
    }
}

module.exports = Products;