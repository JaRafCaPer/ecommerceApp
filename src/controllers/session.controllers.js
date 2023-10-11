import { sessionRepository } from "../services/index.js";
import { generateToken } from "../utils.js";

export const loginUser = async (req, res) => {
  try {
    const user = await sessionRepository.loginUser(req.body);
    if (user == null) return res.redirect("/login");
    const access_token = generateToken(user);
    res
      .cookie("keyCookieForJWT", (user.token = access_token), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })
      .redirect("/profile");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await sessionRepository.registerUser(req.body);
    if (user == null) return res.redirect("/register");
    const access_token = generateToken(user);
    res
      .cookie("keyCookieForJWT", (user.token = access_token), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })
      .redirect("/profile");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCurrent = async (req, res) => {
  try {
    const user = await sessionRepository.getUserCurrent(req.user.user);
    return res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
