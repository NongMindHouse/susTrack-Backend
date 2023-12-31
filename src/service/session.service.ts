import { Session } from "@/lib/prisma"
import { setExpireDate } from "@/utils/setExpireDate";

export const Create = async (userId: string, uuid: string) => {
    const expireTime = setExpireDate(7)
    await Session.create({
        data: {
            uuid: uuid,
            userId: userId,
            expiresAt: expireTime
        }
    })
}

export const Validate = async (id: string) => {
    const session = await Session.findUnique({
        where: { uuid: id }
    })

    if (!session) {
        return null
    }

    // Check Session Expire
    const now = new Date();
    if (session.expiresAt < now) {
        // delete session
        await Session.delete({
            where: {
                uuid: id
            },
        })
        return null
    }
    return session
}

export const Delete = async (id: string) => {
    await Session.delete({
        where: {
            uuid: id
        },
    })
}