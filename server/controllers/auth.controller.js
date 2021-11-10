import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import config from '../../config/config';

export default {
    signin: async (req, res) => {
        try {
            let user = await User.findOne({"email": req.body.email});
            if (!user) return res.status(401).json({error: 'User not found'});
            if (!user.authenticate(req.body.password)) return res.status(401).json({error: 'Email and password do not match...'});
            const token = jwt.sign({_id: user._id}, config.jwtSecret);
            res.cookie('t', token, {expire: config.expire});
            return res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (err) {
            return res.status(201).json({error: 'Could not sign in...'});
        }
    },
    signout: (req, res) => {
        res.clearCookie('t');
        return res.status(200).json({message: 'Signed out'});
    },
    requireSignin: expressJWT({
        secret: config.jwtSecret,
        algorithms: ['HS256'],
        userProperty: 'auth'
    }),
    isAuthorized: (req, res, next) => {
        const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
        if (!authorized) return res.status('403').json({error: 'User is not authorized...'});
        next();
    }
}