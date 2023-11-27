import { userService } from "../services/index.js";

const updateLastConnection = async (req, res, next) => {
  try {
    let user = {};
    if (req.user.user) {
      user = req.user.user;
    } else {
      user = req.user;
    }
    const email = user.email;
    user = await userService.getUserByEmail(email);
    if (user) {
      const id = user._id;
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
