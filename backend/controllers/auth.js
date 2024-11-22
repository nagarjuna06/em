import loginModel from "../schemas/login.js";
import jwtService from "../services/jwt.js";

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await loginModel.findOne({ username });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password",
    });
  }

  const payload = {
    id: user.id,
    username,
  };
  const token = jwtService.generate(payload);

  delete user.password;

  return res.json({
    success: true,
    message: "Login successful",
    data: payload,
    token,
  });
};

export const registerController = async (req, res) => {
  try {
    const user = await loginModel.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
