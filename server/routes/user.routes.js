import express from 'express';
import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/').get(userController.list);
router.route('/').post(userController.create);

router.route('/:userID').get(authController.requireSignin, userController.read);
router.route('/:userID').put(authController.requireSignin, authController.isAuthorized, userController.update);
router.route('/:userID').delete(authController.requireSignin, authController.isAuthorized, userController.remove);

router.param('userID', userController.userById);

export default router;