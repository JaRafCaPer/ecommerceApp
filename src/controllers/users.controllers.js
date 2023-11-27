import mongoose from "mongoose";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { userService } from "../services/index.js";

export const userPremium = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.uid);
    const user = await userService.getUserById(id);
    if (user) {
      if (user.rol === "admin") {
        CustomError.createError({
          message: "No authorized",
          code: EErrors.USER_NOT_AUTHORIZED,
          status: 401,
          info: generateCartErrorInfo({ pid }),
        });
      }
      if (user.rol === "user") {
        user.rol = "premium";
        const udpUser = await userService.updateUser(user._id, user);
        return res.render("profile", udpUser);
      }
      if (user.rol === "premium") {
        user.rol = "user";
        const udpUser = await userService.updateUser(user._id, user);
        return res.render("profile", udpUser);
      }
    } else {
      CustomError.createError({
        message: "User not found",
        code: EErrors.USER_NOT_EXISTS,
        status: 404,
        info: generateCartErrorInfo({ pid }),
      });
    }
  } catch (error) {
    req.logger.fatal("Error al cambiar a usuario premium");
    res.status(500).json({ error: error.message });
  }
};

export const uploadDocuments = async(req, res)=>{
  const id = new mongoose.Types.ObjectId(req.params.uid);
  const user = await userService.getUserById(id);
  const files = req.files
  if (user.rol === "admin") {
    CustomError.createError({
      message: "No authorized to upload documents",
      code: EErrors.USER_NOT_AUTHORIZED,
      status: 401,
      info: generateCartErrorInfo({ pid }),
    });}
  const documents = await userService.uploadDocuments(id, files)
  console.log(documents)
  return res.json(req.files)
}