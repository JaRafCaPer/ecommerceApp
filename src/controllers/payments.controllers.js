import Stripe from 'stripe';
import config from '../config/config.js';
import { ticketService } from '../services/index.js';

const stripe = new Stripe(config.STRIPE_API_KEY);

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
        success_url: `http://localhost:8080/api/payments/success?ticketId=${encodeURIComponent(ticket._id)}`,
        cancel_url: `http://localhost:8080/api/payments/cancel?ticketId=${encodeURIComponent(ticket._id)}`,
    });
  return res.redirect(session.url);
}   

export const success = async (req, res) => {
    const ticketId = req.query.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);
    ticket.purchase_status = "paid";
    console.log(ticket);
    await ticketService.updateTicketById(ticketId, ticket);
    res.redirect("/api/session/ticket/user");
}

export const cancel = async (req, res) => {
    const ticketId = req.query.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);
    await ticketService.updateTicketById(ticketId, {purchase_status: "canceled"});
    res.redirect("/api/session/ticket/user");
}

