import jwtService from "../services/jwt.js";

const jwtMiddleware = (req, res, next) => {
  try {
    let token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided.",
      });
    }
    const payload = jwtService.verify(token);
    req.currentUser = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
      error,
    });
  }
};
export default jwtMiddleware;
