import FileManager from './file.manager.js';
import { v4 as uuidv4 } from 'uuid';

export default class UsersFile extends FileManager {
  constructor(filename = 'users.json') {
    super(filename);
  }

  async createUser(req) {
    try {
      let user = req;
      const newCart = { items: [], total: 0, _id: uuidv4() };
      user.cartId = newCart._id;

      const users = await this.get();
      const carts = await this.readCarts();

      users.push(user);
      carts.push(newCart);

      await this.writeData(users);
      await this.writeCarts(carts);

      return user;
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error creating user:', error);
      return null;
    }
  }

  async getUserById(id) {
    try {
      const users = await this.get();
      return users.find((user) => user._id === id);
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async getUsers() {
    try {
      return await this.get();
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error getting users:', error);
      return null;
    }
  }

  async getInactiveUsers(date) {
    try {
      const users = await this.get();
      return users.filter((user) => user.lastConnection < date);
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error getting inactive users:', error);
      return null;
    }
  }

  async deleteUsers(date) {
    try {
      const users = await this.get();
      const newUsers = users.filter((user) => user.lastConnection >= date);

      await this.writeData(newUsers);
      return newUsers;
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error deleting users:', error);
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      const users = await this.get();
      return users.find((user) => user.email === email);
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async updateUser(id, user) {
    try {
      const users = await this.get();
      const userIndex = users.findIndex((u) => u._id === id);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...user };
        await this.writeData(users);
        return users[userIndex];
      }

      return null;
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error updating user:', error);
      return null;
    }
  }

  async deleteUserById(id) {
    try {
      const users = await this.get();
      const userIndex = users.findIndex((user) => user._id === id);

      if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        await this.writeData(users);
        return deletedUser;
      }

      return null;
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error deleting user by ID:', error);
      return null;
    }
  }

  async readCarts() {
    try {
      return await this.readData('carts.json');
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error reading carts:', error);
      return [];
    }
  }

  async writeCarts(data) {
    try {
      await this.writeData('carts.json', data);
    } catch (error) {
      // Handle the error appropriately in your application
      console.error('Error writing carts:', error);
    }
  }
}
