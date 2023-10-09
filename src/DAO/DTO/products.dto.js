export default class ProductDTO {
  constructor(product) {
    if (!product.title || !product.price || !product.stock) {
      throw new Error('Faltan campos obligatorios');
    }

    this.title = product.title;
    this.description = product.description || '';
    this.price = product.price;
    this.thumbnail = product.thumbnail || '';
    this.code = product.code || '0';
    this.stock = product.stock;
  }
}