import dotenv from "dotenv";
dotenv.config();
import { userModel } from "../../models/Users/Users.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const createToken = (data) => {
    return jwt.sign(data , process.env.SECRET, { expiresIn: '10m' });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const BASE_URL_SERVER = process.env.BASE_URL_SERVER;
    try {
        const oldUser = await userModel.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ state: "error", message: "Email is not found" });
        }
        const token = createToken({ email: oldUser.email, password: oldUser.password });
        console.log(token);
        const link = `${BASE_URL_SERVER}/api/password/reset-password/${oldUser._id}/${token}`;

        //send email to client
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_APP_EMAIL
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password Request | Vinayak Night Canteen',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>You requested a password reset. Please use the button below to reset your password:</p>
                    <p>
                        <a href="${link}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #1a73e8; border-radius: 5px; text-decoration: none;">Reset Password</a>
                    </p>
                    <p style="color: #999;">This link will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
                    <footer style="margin-top: 20px; color: #999;">
                        <p>Thank you,</p>
                        <p>Vinayak Night Canteen</p>
                    </footer>
                </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({ state: "success", message: "Reset Mail sent" });
    }
    catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

export default forgetPassword;