import { RequestHandler } from "express";
import { Chat } from "../models/circlechat";
import { verifyUser } from "../services/auth";
import { User } from "../models/circleuser";
import { getRandomVerse } from "../services/verseService";

export const postDailyVerse: RequestHandler = async (req, res) => {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) {
        return res.status(400).json({ error: 'Invalid groupId' });
    }

    try {
        const verse: any = await getRandomVerse();
        console.log("Fetched verse:", verse);

        if (!verse?.payload?.book?.name || !verse.payload.chapter || !verse.payload.verse || !verse.payload.text) {
            throw new Error("Verse data is invalid.");
        }

        // const reference = `${verse.payload.book.name} ${verse.payload.chapter}:${verse.payload.verse}`;

        // const message = {
        //     username: 'System',
        //     message: `${reference}: "${verse.payload.text}"`,
        //     groupId,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // };

        // await Chat.create(message);
        console.log(`Posted daily verse to group ${groupId}`);

        res.status(200).json({ success: true, verse });
    } catch (err) {
        console.error("Failed to post daily verse:", err);
        res.status(500).json({ error: 'Failed to post daily verse' });
    }
}

export const getAllChats: RequestHandler = async (req, res, next) => {
    console.log('this getAllChats api is being called')
    try {
        let chats = await Chat.findAll();
        res.status(200).json(chats)
    } catch (err) {
        return res.status(404).json({ message: 'There are no chats!' });
    }

}

export const getOneChat: RequestHandler = async (req, res, next) => {
    console.log('this getOneChat api is being called')
    let { chatId } = req.params;
    let chat = await Chat.findByPk(chatId);
    res.status(200).json(chat);
}

export const createChat: RequestHandler = async (req, res, next) => {
    console.log('this createChat api is being called');
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(401).send('User is not authenticated');
    }

    const { groupId, message } = req.body;

    if (!groupId || !message) {
        return res.status(400).json({ message: 'Group ID and message are required.' });
    }

    try {
        const newChat = await Chat.create({
            username: user.username,
            groupId,
            message
        });

        res.status(201).json(newChat);
    } catch (err) {
        console.error('Error creating chat:', err);
        res.status(500).send(err);
    }
};


export const editChat: RequestHandler = async (req, res, next) => {
    console.log('this editChat api is being called');

    try {
        const user: User | null = await verifyUser(req);
        const { chatId } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        const chatFound = await Chat.findByPk(chatId);

        if (!chatFound) {
            return res.status(404).send('Chat not found');
        }

        const updatedFields = req.body;

        await chatFound.update(updatedFields);
        res.status(200).json(chatFound);

    } catch (err) {
        console.error('Error editing chat:', err);
        res.status(500).send(err);
    }
};

export const deleteChat: RequestHandler = async (req, res, next) => {
    console.log('this deleteChat api is being called');

    try {
        const user: User | null = await verifyUser(req);
        let { chatId } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        let chatFound = await Chat.findByPk(chatId);

        if (chatFound) {
            await Chat.destroy({
                where: { chatId: chatId }
            });
            res.status(200).json();
        }
        else {
            res.status(404).json();
        }

    } catch (err) {
        console.error('Error deleting chat:', err);
        res.status(500).send(err);
    }
}

export const getChatsByGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const chats = await Chat.findAll({ where: { groupId } });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching chats by group', error: err });
    }
};

export const deleteChatsByGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        console.log("chats destroyed in group")
        const chats = await Chat.destroy({ where: { groupId } });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching delete chats in group', error: err });
    }
};

