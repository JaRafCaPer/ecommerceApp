import { ticketService } from "../services/index.js";

export const getTicket = async (request, response) => {
  try {
    const user = request.user; 
    const result = await ticketService.getTicket(user);
    response.send({ status: 'success', payload: result });
  } catch (error) {
    response.status(400).send({ status: 'error', message: error.message });
  }
};

export const getTicketById = async (request, response) => {
  try {
    const { tid } = request.params;
    const result = await ticketService.getTicketById(tid);
    response.send({ status: 'success', payload: result });
  } catch (error) {
    response.status(400).send({ status: 'error', message: error.message });
  }
};




export const createTicket = async (request, response) => {
  try {
    const { user, cartId } = request.body; // usar postman 
    const result = await ticketService.createTicket(user, cartId);
    response.send({ status: 'success', payload: result });
  } catch (error) {
    response.status(400).send({ status: 'error', message: error.message });
  }
};


export const resolveTicket = async (request, response) => {
  try {
    const { resolve } = request.query;
    const { tid } = request.params;
    const result = await ticketService.resolveTicket(tid, resolve);
    response.send({ status: 'success', payload: result });
  } catch (error) {
    response.status(400).send({ status: 'error', message: error.message });
  }
};
