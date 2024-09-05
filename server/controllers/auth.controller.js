import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generatedVerificationToken } from "../utils/generatedVerificationToken.js";
import { generatedTokenandSetCookie } from "../utils/generatedTokenandSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

class Controller {
  static async singup(req, res) {
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) throw new Error("All fields are required!");

      const userExists = await User.findOne({ email });

      if (userExists) return res.status(400).json({ success: false, message: "User already exists!" });

      const hashPassword = await bcrypt.hash(password, 10);

      const verificationToken = generatedVerificationToken();

      const newUser = new User({
        username,
        email,
        password: hashPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      await newUser.save();

      generatedTokenandSetCookie(newUser._id, res);

      await sendVerificationEmail(newUser.email, verificationToken);

      res.status(201).json({
        success: true,
        message: "User created successfully!",
        user: {
          ...newUser._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
      res.status(500).json({ message: "Internal server error!" });
    }
  }

  static async verifyEmail(req, res) {
    const { code } = req.body;

    try {
      const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });

      if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code!" });

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;

      await user.save();

      await sendWelcomeEmail(user.email, user.username);

      res.status(200).json({
        success: true,
        message: "Email verified successfully!",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  }
}

export default Controller;
