import UserDTO from "../DAO/DTO/users.dto.js";

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    getUsers = async (populate = false) => { 
        return await this.dao.getUsers(populate) 
    }
    createUser = async (user)=>{
        const userToCreate = new UserDTO(user)
        return await this.dao.createUser(userToCreate)
    }
    getUserById = async(id) => { return await this.dao.getUserById(id) }
    saveUser = async(user) => { 
        const userToInsert = new UserDTO(user)
        return await this.dao.saveUser(userToInsert)
    }
    addTicketToUser = async ( userId, ticketId) => {
        const user = await this.dao.getUserById(userId)
        user.tickets.push(ticketId)
        return await this.dao.updateUser(user.id, user)
    }
    getUserByEmail = async (email, populate = false) =>  {
        return await this.dao.getUserByEmail(email, populate)
}
}
