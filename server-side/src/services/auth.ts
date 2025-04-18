import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/circleuser';

const secret = 'Jesus is Lord';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        { username: user.username },
        secret,
        { expiresIn: '1hr' }     
    );
    return token;
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            let decoded: any = jwt.verify(token, secret);
            return await User.findOne({ where: { username: decoded.username } });
        } catch (err) {
            console.error("Token verification error:", err);
            return null;
        }
    } else {
        return null;
    }
}