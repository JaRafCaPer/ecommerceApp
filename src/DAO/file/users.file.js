import FileManager from "./file.manager.js";
import Ticket from "./tickets.file.js";
import Cart from '../file/carts.file.js'


export default class User extends FileManager {

    constructor(filename = './db.users.json') {
        super(filename)
        this.ticketFile = new Ticket()
        this.cartFile = new Cart()
    }
    getUsers = async (populate = false) => { 
        const users = await this.get()
        
        if(populate) {
            const tickets = await this.ticketFile.getTickets()
            for (let i = 0; i < users.length; i++) {
                const result = []
                const ticketUsers = users[i].tickets
                ticketUsers.forEach(oid => {
                    let ticket = tickets.fnd(o => o.id = oid)
                    result.push(ticket)
                })
                users[i].tickets = result
            }
        }

        return users
    }
    getUserById = async(id) => { return await this.getById(id) }
    createUser = async(user) => { return await this.add(user)}
    updateUser = async(id, user) => {
        user.id = id
        return await this.update(user)
    }
}