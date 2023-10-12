import { sessionService } from "../services/index.js";
import { cartService } from "../services/index.js";
import { generateToken } from "../utils.js";

export const loginUser = async (req, res) => {
  try {
    
    const user = await sessionService.loginUser(req.body);
    if (user == null) return res.redirect("/login");
    
    const access_token = generateToken(user);
    
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
