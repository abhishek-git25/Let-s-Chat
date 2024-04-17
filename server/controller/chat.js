import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utilit.js";

const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body

    if (members.length < 2) {
        return next(new ErrorHandler("Group chat must have atleast 3 members", 400))
    }

    const allMembers = [...members, req.user]

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers
    })

    emitEvent(req, ALERT, allMembers, `You created the ${name} group`)
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(201).json({
        success: true,
        message: "Group Created"
    })


})

export { newGroupChat }