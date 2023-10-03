import { User, Cart,Product, Ticket } from '../DAO/factory.js'
import UserRepository from './users.repository.js'
import CartRepository from './carts.repository.js'
import ProductRepository from './products.repository.js'
import TicketRepository from './tickets.repository.js'

export const userService = new UserRepository(new User())
export const ticketService = new TicketRepository(new Ticket())
export const cartService = new CartRepository(new Cart())
export const productService = new ProductRepository(new Product())

