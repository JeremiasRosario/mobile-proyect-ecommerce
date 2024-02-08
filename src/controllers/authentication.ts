import express from "express";
import { authentication, random } from "../helpers/index";

import { getUsersByEmail, createUser, getUserById } from '../db/users';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || password) {
            return res.sendStatus(400);
        }

        const user = await getUsersByEmail(email);
        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {

    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);

        }

        const existingUser = await getUsersByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        return res.status(200).json(user).end();




    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}