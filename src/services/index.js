import { User, Order, Cart, Product } from '../DAO/factory.js'
import UserRepository from './users.repository.js'
import OrderRepository from './orders.repository.js'
import ProductRepository from './product.repository.js'
import CartRepository from './cart.repository.js'
import ChatRepository from './chat.repository.js'

export const userService = new UserRepository(new User())
export const orderService = new OrderRepository(new Order())
export const productService = new ProductRepository(new Product())
export const cartService = new CartRepository(new Cart())
export const chatService = new ChatRepository(new Chat())