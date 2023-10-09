import { Carts, User, Products, Messages, Tickets } from '../DAO/factory.js';
import CartService from './cart.services.js';
import ProductService from './products.services.js';
import UserService from './user.services.js';
import MessageService from './messages.services.js';
import TicketService from './ticket.services.js'; 

export const cartService = new CartService(new Carts());
export const productService = new ProductService(new Products());
export const userService = new UserService(new User());
export const messageService = new MessageService(new Messages());
export const ticketService = new TicketService(new Tickets()); 