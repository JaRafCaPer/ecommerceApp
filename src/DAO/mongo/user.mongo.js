import UserModel from './models/users.mongo.model.js';

export default class UserDAO {
  createUser(user) {
    return UserModel.create(user);
  }

  getUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  async getUserByEmail(email, populate = false){
    if(populate){
        const findUser = await UserModel.findOne({email: email}).populate('cart').lean().exec()
        return findUser
    }
    const findUser = await UserModel.findOne({email: email})
    // if(!findUser) throw new Error('Unable to find the user!')
    return findUser
}
  getUserById(id) {
    return UserModel.findById(id);
  }

  deleteUser(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
