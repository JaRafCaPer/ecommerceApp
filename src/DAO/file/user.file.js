import FileManager from './file.manager.js';
import CartManager from './carts.file.js';


export default class UsersFile extends FileManager {
  constructor(filename = 'users.json') {
    super(filename);
  }

  async createUser(user) {
    const users = await this.get();

    const cartManager = new CartManager();
    const newCart = await cartManager.createCart();

    user.cartId = newCart._id;
    users.push(user);
    
  
    // Escribe tanto la lista de usuarios como la de carritos en los archivos
    await this.writeData(users, 'users.json');
    await this.writeData(carts, 'carts.json');
  
    return user;
}
  async getUserById(id) {
    const users = await this.get();
    return users.find((u) => u.id === id);
  }

  async getUsers() {
    return this.get();
  }

  async getUserByEmail(email) {
    const users = await this.get();
    return users.find((user) => user.email === email);
  }

  async updateUser(id, user) {
    const users = await this.get();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users[userIndex] = user;
      await this.writeData(users);
      return user;
    }
    return null;
  }

  async deleteUser(id) {
    const users = await this.get();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      await this.writeData(users);
      return deletedUser;
    }
    return null;
  }
}
