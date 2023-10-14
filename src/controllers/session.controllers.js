import { sessionService } from "../services/index.js";
import { userService } from "../services/index.js";
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

// Route to show the reset password form
export const showResetPasswordForm = (req, res) => {
  const token = req.query.token;
  res.render('resetPassword', { token });
};

// Route to process password reset
export const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  // Find the token in the database
  const resetToken = await sessionService.findToken({ token });

  if (!resetToken) {
    return res.status(400).send('Invalid or expired token.').render('requestTokenPassword', { token });
  }

  // Update the user's password
  const user = await userService.getUserById(resetToken.user._id);
  console.log('user session password', user)
  user.password = password;
  console.log('user session password2', user)
  await user.save();

  // Remove the reset token from the database
  await resetToken.remove();

  res.send('Password reset successfully.');
};