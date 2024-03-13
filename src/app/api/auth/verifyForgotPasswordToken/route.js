import ResetToken from "@/models/resetToken";
import User from "@/models/user";
import {  compareSync, hashSync } from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { token, id, password } = await req.json();
        console.log(token, id);

        if (!token || !id || !password) {
            return NextResponse.json({
                message: "Invalid request"
            });
        }

        const existUser = await User.findById(id);

        if (!existUser) {
            return NextResponse.json({
                message: "User not found"
            });
        }

        const resetToken = await ResetToken.findOne({ owner: existUser._id });

        if (!resetToken) {
            return NextResponse.json({
                message: "Reset token not found"
            });
        }

        console.log('1')
        const isValid = await compareSync(token,resetToken.token)

        if (!isValid) {
            return NextResponse.json({
                message: "Reset token is invalid"
            });
        }

        const hashedPassword = await hashSync(password, 10);

        // Update the user's password in the database
        await User.findByIdAndUpdate(id, {
            password: hashedPassword
        });

        return NextResponse.json({
            success:true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
