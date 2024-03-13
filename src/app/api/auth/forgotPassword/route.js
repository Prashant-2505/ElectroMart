import ResetToken from "@/models/resetToken";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectToDb from "@/database";

export async function POST(req) {
  try {
    connectToDb();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        message: "Please enter a valid email",
      });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return NextResponse.json({
        message: "User not found, invalid request",
      });
    }

    const existingToken = await ResetToken.findOne({ owner: existUser._id });
    if (existingToken) {
      return NextResponse.json({
        message: "Only one token request allowed per hour.",
      });
    }

    const generatedToken = crypto.randomBytes(30).toString("hex");

    // Save the generated token to the database
    const resetToken = await ResetToken.create({
      owner: existUser._id,
      token: generatedToken,
    });

    if (!resetToken) {
      throw new Error("Failed to create reset token");
    }

    const resetUrl = `https://electro-mart.vercel.app/reset-password?token=${generatedToken}&id=${existUser._id}`;

    // Create a Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL, // Replace with your email address from environment variable
        pass: process.env.PASS, // Replace with your email password from environment variable
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MAIL,
      to: existUser.email,
      subject: "Password Reset for Your Account",
      html: `
        <p>Click on the following link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Password reset link sent to mail",
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({
      message: `Internal Server Error + ${error.message}`,
    }, { status: 500 });
  }
}
