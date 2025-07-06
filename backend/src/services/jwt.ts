import config from "../config/index";
import jwtLib, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../utils/types";

const secret = config.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const jwt = {
  registerAccessToken(
    payload: JwtPayload,
    expiresIn: SignOptions["expiresIn"] = "15m"
  ) {
    const options: SignOptions = { expiresIn };
    return jwtLib.sign(payload, secret, options);
  },
};

export default jwt;
