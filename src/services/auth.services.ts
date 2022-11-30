import client from "../prisma";
import jwt from 'jsonwebtoken';
import { HttpException } from "../utils/HttpException";
import crypto from 'crypto-js';
import { User } from "@prisma/client";

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

interface Token {
    expires: number;
    accessToken: string;
}

function createUserToken(user: User): Token {
    const dataStoredInToken = { userId: user.id };
    const accessKey = process.env.ACCESS_SECRET_KEY;

    const accessToken = jwt.sign(dataStoredInToken, accessKey ?? 'default-key', { expiresIn: ONE_MONTH_IN_SECONDS });

    return { accessToken, expires: ONE_MONTH_IN_SECONDS };
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
    const existingUser = await client.user.findUnique({
        where: { email: email },
    });

    if (existingUser != null) {
        throw new HttpException(400, 'Email already registered');
    }

    const hashedPassword = crypto.SHA256(password).toString();

    const user = await client.user.create({
        data: { email, password: hashedPassword, firstName, lastName },
    });

    return {
        user,
        token: createUserToken(user),
    };
}

export async function login(email: string, password: string) {
    const user: User | null = await client.user.findUnique({ where: { email } });
    if (!user) throw new HttpException(404, 'No user found with this email');

    const hashedPassword = crypto.SHA256(password).toString();
    if (hashedPassword !== user.password) throw new HttpException(403, 'Wrong password');

    const users = await client.user.update({
        where: { id: user.id },
        data: { lastLoginDate: new Date() },
    });

    return {
        user,
        token: createUserToken(user),
    };
};