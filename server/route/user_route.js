import { Router } from "express";
import { registerUserController, verifyEmailController, loginController, logoutController, uploadAvatar, updateUserDetails, forgotPasswordController, verifyForgotPasswordOtp, resetPassword, refreshToken, userDetails } from "../controller/user_controller.js";
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js";

const userRouter =Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avater',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-data',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

export default userRouter
