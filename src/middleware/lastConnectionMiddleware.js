import userModel from "../DAO/mongo/models/user.mongo.models";

const updateLastConnection = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await userModel.findById(id);
    if (user) {
      user.lastConnection = new Date();
      await user.save();
      next();
    } else {
      res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    req.logger.fatal("Error al actualizar lastConnection");
    res.status(500).json({ error: error.message });
  }
}
export default updateLastConnection;