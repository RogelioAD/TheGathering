import { RequestHandler } from "express";
import { User } from "../models/circleuser";
import { hashPassword, comparePasswords, signUserToken } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName) {
        return res.status(400).send('All fields are required!')
    }

    try {
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.status(201).json({
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'createUser did not work!' });
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            where: { username: req.body.username }
        });

        if (!existingUser) {
            return res.status(401).json('Invalid username');
        }

        const passwordMatch = await comparePasswords(req.body.password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json('Invalid password');
        }

        const token = await signUserToken(existingUser);

        res.status(200).json({ message: 'loginUser was successfully executed!', token });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'loginUser did not work!' });
    }
};

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
};
