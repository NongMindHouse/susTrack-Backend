import { User } from "@/lib/prisma";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export const validateIDToken = async (idToken: string) => {
    if (!idToken) throw new Error("No id-token ");

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        return decoded;
    } catch (error) {
        throw new Error("Validate Token Error");
    }
};

export const Create = async (tokenData: DecodedIdToken) => {
    if (!tokenData) throw new Error("No Token Provide");
    const result = await User.create({
        data: {
            email: tokenData.email as string,
            profileUrl: tokenData.picture,
            userName: tokenData.name,
        },
    });
    return result;
};

export const Find = async (email: string) => {
    if (!email) throw new Error("No Email Provide");
    const user = await User.findFirst({
        where: {
            email: email,
        },
    });
    return user;
};