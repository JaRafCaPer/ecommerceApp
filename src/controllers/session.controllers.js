import { sessionService } from "../services/index.js";
import { userService } from "../services/index.js";
import { generateToken } from "../utils.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const logData = req.body;
    console.log("logData in sessionController", logData);
    const user = await sessionService.loginUser(logData);
    if (user == null) return res.redirect("/login");
    
    const access_token = generateToken(user);
    console.log('userin login', user)
    res
      .cookie("keyCookieForJWT", (user.token = access_token), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })
      
      .redirect("/api/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log("userData in sessionController", userData);
    const user = await sessionService.registerUser(userData);
    console.log("user in sessionController1234", user);
  
    const access_token = generateToken(user);
    res
      .cookie("keyCookieForJWT", (user.token = access_token), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })
      .redirect("/login");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserCurrent = async (req, res) => {
  try {
    const user = await sessionService.getUserCurrent(req.user);
    console.log('current', user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetearPassword = async (req, res) => {
  try {
    res.render("resetearPassword", {});
  } catch (error) {
    req.logger.fatal("Error al resetear la contraseña");
    res.status(500).json({ error: error.message });
  }
};

export const restart = async (req, res) => {
  const email = req.body.email;
   const result = await sessionService.validUserSentEmailPassword(email);
   console.log("result in sessionController", result);
  res.send({
    status: "success",
    message: "Email enviado con las instrucciones para cambiar la contraseña",
  });
};

export const resetPasswordForm = async (req, res) => {
  const token = req.params.token;
  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) {
      req.logger.fatal("Token de verificacion no válido");
      res.status(500).render("resetearPassword");
    }
    res.status(200).render("formReset");
  });
};

export const validPassword = async (req, res) => {
  try {
    const password = req.body.newPassword;
    const email = req.body.email;
    const confirmpassword = req.body.confirmPassword;
    await sessionService.resetPasswordForm(email, password, confirmpassword);
    res.render("login", {});
  } catch (error) {
    req.logger.fatal("Error al validar la contraseña");
    res.status(500).json({ error: error.message });
  }
};

export const getTicketByUser = async (req, res) => {
  try {
    const user = req.user.user;
    console.log("user in controller", user);
    const tickets = await sessionService.getTicketByUser(user);
    console.log("ticket in controller", tickets);
    res.status(200).render("tickets",  tickets );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}