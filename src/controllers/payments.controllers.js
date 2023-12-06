import Stripe from 'stripe';
import config from '../config/config.js';
import { ticketService } from '../services/index.js';
import { cartService } from '../services/index.js';
import nodemailer from "nodemailer";

const stripe = new Stripe(config.STRIPE_API_KEY);
const transporter = nodemailer.createTransport({
    service: "gmail",
    
    auth: {
      user: config.USER,
      pass: config.PASS,
    },
  });

export const createSession = async (req, res) => {
    const ticketId = req.query.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);
    const products = ticket.products

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(product => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.title,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        })),
        mode: 'payment',
        success_url: `https://backend-project-production-f542.up.railway.app/api/payments/success?ticketId=${encodeURIComponent(ticket._id)}`,
        cancel_url: `https://backend-project-production-f542.up.railway.app/api/payments/cancel?ticketId=${encodeURIComponent(ticket._id)}`,
    });
  return res.redirect(session.url); 
}   

export const success = async (req, res) => {
    const ticketId = req.query.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);
    const cart = await cartService.getCartUserEmail(ticket.purchaser);
    ticket.purchase_status = "paid";
    const id = cart.cart._id;
    await cartService.updateCartById(id, { products: [] });
    await ticketService.updateTicketById(ticketId, ticket);
    const result = transporter.sendMail({
        from: config.USER,
        to: ticket.purchaser,
        subject: "Thank you for your purchase!",
        html: `Thank you for your purchase! Your order number is ${ticket._id}.
         Your products are: ${ticket.products.map((product) => product.title).join(", ")}.
         A confirmation email will be sent to you when your order is shipped.`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return info.response;
        }
      })



    res.render("success", ticket)
}

export const cancel = async (req, res) => {
    const ticketId = req.query.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);
    ticket.purchase_status = "canceled";
    await ticketService.updateTicketById(ticketId, ticket);
    res.render("cancel", ticket)
}

