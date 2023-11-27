import { userService } from "../services/index.js";

const updateLastConnection = async (req, res, next) => {
  try {
    let user = req.user.user || req.user;
    const id = user._id;
    user = await userService.getUserById(id);
    if (user) {
      user.lastConnection = new Date();
      const updatedUser = await userService.updateUser(id, user);
      console.log("Updated user:", updatedUser);
      req.user = updatedUser;
      return next();
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating lastConnection:", error);
    return res.status(500).json({ error: "Failed to update lastConnection" });
  }
};

export default updateLastConnection;
