import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    number: Number,
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'stores'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    status: String,
    totalPrice: Number
})

const TicketModel = mongoose.model('Ticket', TicketSchema)

export default TicketModel