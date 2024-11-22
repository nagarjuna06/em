import Jwt from "jsonwebtoken";
import vars from "../core/config.js";

class jwtService {
  static generate(payload) {
    return Jwt.sign(payload, vars.secretKey, {
      expiresIn: vars.tokenExpiration,
    });
  }

  static verify(token) {
    const { payload } = Jwt.verify(token, vars.secretKey);
    return payload;
  }
}

export default jwtService;
