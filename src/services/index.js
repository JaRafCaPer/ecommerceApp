import { Product, Cart, User, Message, Ticket } from "../DAO/factory.js";

import CartService from "./carts.services.js";
import ProductService from "./products.services.js";
import UserService from "./users.services.js";
import MessageService from "./messages.services.js";
import TicketService from "./ticket.services.js";
import SessionService from "./session.services.js"
import { ne } from "@faker-js/faker";

export const cartService = new CartService( new Cart(), new Product(), new User(), new Ticket());
export const productService = new ProductService(new Product(), new User());
export const userService = new UserService(new User());
export const messageService = new MessageService(new Message());
export const ticketService = new TicketService(new Ticket());
export const sessionService = new SessionService(new User(), new Cart(), new Ticket());

