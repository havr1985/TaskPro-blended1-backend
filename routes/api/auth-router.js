import express from "express";
import { valBody } from "../../decorators/index.js";
import * as userShemas from '../../models/User.js';
import authController from "../../controllers/auth-controller.js";
import { authenticate, upload } from "../../midelwares/index.js";


const authRouter = express.Router();

const userSignupValidate = valBody(userShemas.userSignupSchema);
const userSigninValidate = valBody(userShemas.userSigninShema);
const userRefreshValidate = valBody(userShemas.userRefreshTokenShema);
const userChangeTheme = valBody(userShemas.userThemeSchema);


authRouter.post('/signup', userSignupValidate, authController.singup);
authRouter.post('/signin', userSigninValidate, authController.singin);
authRouter.post('/signout', authenticate, authController.signout);
authRouter.get('/current', authenticate, authController.current);
authRouter.post('/refresh', userRefreshValidate, authController.refresh);
authRouter.patch('/users/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);
authRouter.patch('/users/theme', authenticate, userChangeTheme, authController.updateTheme);


export default authRouter;