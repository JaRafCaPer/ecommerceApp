import { Router } from "express";
import {createTicket, getTicketByCode } from "../controllers/tickets.controller.js";

const router = Router()


router.get('/:tc', getTicketByCode)
router.post('/', createTicket)


export default router