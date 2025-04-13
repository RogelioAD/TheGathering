import { RequestHandler } from 'express';
import { Group } from '../models/circlegroup';
import { verifyUser } from '../services/auth';

export const createGroup: RequestHandler = async (req, res) => {
    const user = await verifyUser(req);
    if (!user) return res.status(401).send("User not authenticated.");

    const { groupname } = req.body;
    if (!groupname) return res.status(400).json({ message: "Group name is required." });

    try {
        const group = await Group.create({ groupname });
        res.status(201).json(group);
    } catch (err) {
        console.error("Error creating group:", err);
        res.status(500).send(err);
    }
};

export const getAllGroups: RequestHandler = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.status(200).json(groups);
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).send(err);
    }
};

export const getGroupById: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findByPk(groupId);
        if (!group) return res.status(404).send("Group not found.");
        res.status(200).json(group);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deleteGroup: RequestHandler = async (req, res) => {
    const { groupId } = req.params;

    try {
        const deleted = await Group.destroy({ where: { groupId: groupId } });
        if (deleted) res.status(204).send();
        else res.status(404).send("Group not found.");
    } catch (err) {
        res.status(500).send(err);
    }
};
