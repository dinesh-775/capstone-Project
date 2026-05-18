import exp from 'express'
import { authenticate } from '../services/authService.js'
export const commonRoute = exp.Router();

// login
commonRoute.post('/login', async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  //send res
  res.status(200).json({ message: "login successfull", payload: user });
});

// logout
commonRoute.get('/logout', async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true, // Must match original  settings
    secure: false,   // Must match original  settings
    sameSite: 'lax' // Must match original  settings
  });

  res.status(200).json({ message: 'Logged out successfully' });
})