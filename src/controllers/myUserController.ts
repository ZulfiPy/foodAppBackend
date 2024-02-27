import { Request, Response } from "express";
import User from "../models/User";

const createUser = async (req: Request, res: Response) => {
    if (!req.body?.auth0id && !req.body?.email) return res.status(400).json({ 'message': 'missing values' });
    console.log('im here', req.body)

    try {
        const { auth0Id } = req.body
        const existingUser = await User.findOne({ auth0Id });
        console.log('user not found', existingUser)
        if (existingUser) return res.status(409).json({ 'message': 'user already exists' });

        console.log('here')
        const newUser = await User.create(req.body);
        console.log('new User try', newUser)
        return res.status(201).json({ newUser });
    } catch (err) {
        return res.status(500).json({ 'message': 'Error creating user' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ 'message': 'user not found' })
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();

        return res.status(500).json({'updated user': user });
    } catch (err) {
        console.log('log error in update user', err);
        res.status(500).json({ 'message': 'Error updating user' });
    }
}

export default {
    createUser,
    updateUser
}