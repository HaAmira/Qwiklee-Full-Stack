import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user_model.js";
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemaplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadimageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplet from "../utils/forgotpasswordTemplet.js";
import { request, response } from "express";
import jwt from 'jsonwebtoken'

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from binkeyit",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body
        console.log(code);

        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "verify email done",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function loginController(request, response) {
    try {
        const { email, password } = request.body

        if (!email || !password) {
            return response.status(500).json({
                message: "Provide email, password",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(500).json({
                message: "User not register",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "Check your Password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accessToken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        const updateUser = await UserModel.findByIdAndUpdate(user._id,{last_login_date: new Date()})

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutController(request, response) {
    try {
        const userid = request.userId

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.clearCookie("accessToken", cookiesOption)
        response.clearCookie("refreshToken", cookiesOption)

        const removeRefershToken = await UserModel.findByIdAndUpdate(userid, {
            refreshToken: ""
        })

        return response.json({
            message: "logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId
        const image = request.file

        const upload = await uploadImageClodinary(image)
        
        const uploadUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            data: {
                _id : userId,
                avatar : upload.url
            },
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId;

        const { name, email, mobile, password } = request.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt)
        }

        if (name === "" || email === "") {
            return response.status(400).json({
                message: "Enter name and email",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && {name: name}),
            ...(email && { email: email }),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: password})
        })
        return response.json({
            message: "Update Successfully",
            data: updateUser,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Invalid email",
                error: true,
                success: false
            })
        }
        const otp = generateOtp()
        const expiretime = new Date() + 60 * 60 * 1000

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expiretime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "forgot Password from binkeyit",
            html: forgotPasswordTemplet({
                name: user.name,
                otp: otp
            })
        })

        return response.json({
            message: "check your email",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return reponse.status(400).json({
                message: "Provide required field email, otp",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "Invalid email",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expiry < currentTime) {
            return response.status(400).json({
                message: "Your OTP has been expire.",
                error: true,
                success: false
            })
        }
        if (user.forgot_password_otp !== otp) {
            return response.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : "",
        })

        return response.json({
            message: "Otp verify",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export async function resetPassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide valid email and Password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "email is not avaliable",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword are different",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword
        })

        return response.json({
            message: "Password update successfully.",
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function refreshToken(request,response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function userDetails(request, response) {
    try{
        const userId = request.userId
        // console.log("userId",userId);
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    }catch(error){
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}