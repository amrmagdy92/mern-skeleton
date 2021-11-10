import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';

export default {
    create: async (req, res, next) => {
        const user = new User(req.body);
        try {
            await user.save();
            return res.status(200).json({message: 'Successfully signed up'});
        } catch (err) {
            return res.status(400).json({error: errorHandler.getErrorMessage(err)});
        }
    },
    list: async (req, res) => {
        try {
            let users = await User.find().select('name email updated created');
            res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({error: errorHandler.getErrorMessage(err)});
        }
    },
    userById: async (req, res, next, id) => {
        try {
            let user = await User.findById(id);
            if (!user) res.status(400).json({error: `User(${id} was not found...)`});
            req.profile = user;
            next();
        } catch (err) {
            return res.status(400).json({error: `Couldnot retrieve user(${id})`});
        }
    },
    read: (req, res) => {
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        return res.status(200).json(req.profile);
    },
    update: async (req, res, next) => {
        try {
            let user = req.profile;
            user = extend(user, req.body);
            user.updated = Date.now();
            await user.save();
            user.hashed_password = undefined;
            user.salt = undefined;
            res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({error: errorHandler.getErrorMessage(err)});
        }
    },
    remove: async (req, res, next) => {
        try {
            let user = req.profile;
            let deletedUser = await user.remove();
            deletedUser.hashed_password = undefined;
            deletedUser.salt = undefined;
            res.status(200).json(deletedUser);
        } catch (err) {
            return res.status(400).json({error: errorHandler.getErrorMessage(err)});
        }
    }
}