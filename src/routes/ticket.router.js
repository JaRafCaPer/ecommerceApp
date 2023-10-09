import express from "express";
import passport from "passport";
import * as ticketController from "../controllers/tickets.controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/", ticketController.getTicket); // por ahora le saque el jwt
ticketRouter.get("/:tid", ticketController.getTicketById);
ticketRouter.post("/", ticketController.createTicket); // por ahora le saque el jwt


export default ticketRouter;
