import userModel from "./models/user.mongo.models.js";
import cartModel from "./models/carts.mongo.models.js";


export default class UsersMongo {
    async createUser(req) {
        try {
            let user = req;
            console.log("usermongo Createuser", user)
            const newCart = await cartModel.create({ items: [], total: 0 });
            user.cartId = newCart._id;
            const userAdded = await userModel.create(user);
            console.log("newCart", newCart)
            console.log("userAdded1", userAdded)
            console.log("userAdded2", userAdded)

            return userAdded;
        } catch (error) {
            throw error;
        }
    }



    async getUserById(id) {
        try {
            return await userModel.findById(id).lean().exec();
        } catch (error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            return await userModel.find().lean().exec();
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            console.log("email mongo", email)
            const user = await userModel.findOne({ email: email }).lean().exec();
            console.log("user mongo", user)
            return user
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            return await userModel.findByIdAndUpdate(id, user);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await userModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}