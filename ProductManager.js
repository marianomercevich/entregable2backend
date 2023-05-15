import fs from 'fs'

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath
    this.format = 'utf-8'
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let products = await this.getProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = {id: lastProductId + 1, title, description, price, thumbnail, code, stock,}
    products.push(newProduct) 
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'))
  }

  getProducts = async () => {
    const fileContent = await fs.promises.readFile(this.filePath, this.format)
    return JSON.parse(fileContent)
  }
  getProductById = async (id) => {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct = async (index, updatedProduct) => {
    let products = await this.getProducts();
    products[index] = { ...products[index], ...updatedProduct };
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'))
  }

  deleteProduct = async (index) => {
    let products = await this.getProducts()
    products.splice(index, 1);
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'))
  }
}



const manager = new ProductManager('./products.json')
    manager.getProducts()
    manager.addProduct( 'id', 'producto prueba', 'Este es un producto prueba', 1500, 'Sin imagen', 'abc122', 5)
   /*  manager.updateProduct(2, { price: 700 }) */
    /* manager.deleteProduct(0) */



