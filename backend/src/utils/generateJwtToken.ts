import jwt from "jsonwebtoken";
import "dotenv/config";
import { Jwtpayload } from "../types/jwtPayload";

const generateJwtToken = async (payload: Jwtpayload) => {
	const privateKey = process.env.JWT_PRIVATE_KEY;
	// console.log("generateJwtToken", privateKey);
	const jswToken = await jwt.sign(payload, privateKey);
	// const jswToken = await jwt.sign(payload, privateKey, { expiresIn: 60 });
	return jswToken;
};

export default generateJwtToken;
