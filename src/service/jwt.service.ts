import jwt, { JwtPayload } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("Please Define JWT_SECRET");
}

export interface customJwtPayload extends JwtPayload {
    email: string;
    uuid: string;
    exp?: number | undefined;
    iat?: number | undefined;
}

export const Validate = (token: string) => {
    const decoded = jwt.verify(token, secret) as customJwtPayload;
    return decoded
}

export const generateToken = (email: string, uuid: string) => {
    const token = jwt.sign({ email: email, uuid: uuid }, secret, {
        expiresIn: "7d", // 7 days
    });
    return token;
};