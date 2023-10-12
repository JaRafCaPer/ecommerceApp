import userModel from "./models/user.mongo.models.js";
import cartModel from "./models/carts.mongo.models.js";
import CustomError from "../../errors/CustomError.js";
import EErrors from "../../errors/enums.js";
import { generateUserErrorInfo } from "../../errors/info.js";


export default class UsersMongo {
    async createUser(req) {
        try {
            let user = req;
            const newCart = await cartModel.create({ items: [], total: 0 });
            user.cartId = newCart._id;
            const userAdded = await userModel.create(user);
            

            return userAdded;
        } catch (error) {
            CustomError.createError({
                name: "Error",
                message: "User not added",
                code: EErrors.USER_NOT_ADDED,
                info: generateUserErrorInfo(user),
            });
        }
    }



    async getUserById(id) {
        try {
            return await userModel.findById(id).lean().exec();
        } catch (error) {
            CustomError.createError({
                name: "Error",
                message: "User not found",
                code: EErrors.USER_NOT_FOUND,
                info: generateUserErrorInfo(user),
            });
        }
    }

    async getUsers() {
        try {
            return await userModel.find().lean().exec();
        } catch (error) {
           CustomError.createError({
                name: "Error",
                message: "Users not found",
                code: EErrors.USERS_NOT_FOUND,
                info: generateUserErrorInfo(user),
            });
        }
    }

    async getUserByEmail(email) {
        try {
            console.log("email mongo", email)
            const user = await userModel.findOne({ email: email }).lean().exec();
            console.log("user mongo", user)
            return user
        } catch (error) {
            CustomError.createError({
                name: "Error",
                message: "User not found",
                code: EErrors.USER_NOT_FOUND,
                info: generateUserErrorInfo(user),
            });
        }
    }

    async updateUser(id, user) {
        try {
            return await userModel.findByIdAndUpdate(id, user);
        } catch (error) {
            CustomError.createError({
                name: "Error",
                message: "User not updated",
                code: EErrors.USER_NOT_UPDATED,
                info: generateUserErrorInfo(user),
            });
        }
    }

    async deleteUser(id) {
        try {
            return await userModel.findByIdAndDelete(id);
        } catch (error) {
           CustomError.createError({
                name: "Error",
                message: "User not deleted",
                code: EErrors.USER_NOT_DELETED,
                info: generateUserErrorInfo(user),
            });
        }
    }
}