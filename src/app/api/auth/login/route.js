import connectToDb from '@/database/index';
import User from '@/models/user';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const dynamic = "force-dynamic";

export async function POST(req) {
    console.log(process.env.JWT_SECRET); // Corrected typo in environment variable name

    await connectToDb();

    const { email, password } = await req.json();

    if (!email || !password) {
        return {
            status: 400,
            body: { success: false, message: "Please fill all required fields" }
        };
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return {
                status: 401,
                body: { success: false, message: "User does not exist. Please sign in" }
            };
        }

        const checkPassword = await compareSync(password, existingUser.password);
        if (!checkPassword) {
            return {
                status: 401,
                body: { success: false, message: "Wrong Password or Email. Please use valid details." }
            };
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set cookie directly through response object
        req.res.setHeader('Set-Cookie', `access_token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}`);

        return {
            status: 200,
            body: {
                success: true,
                message: "Login successful",
                user: {
                    email: existingUser.email,
                    name: existingUser.name,
                    id: existingUser._id,
                    role: existingUser.role,
                    address: existingUser.address,
                },
                token: token,
            }
        };
    } catch (error) {
        console.error("Error while logging in:", error); // Log error object for better debugging

        return {
            status: 500,
            body: { success: false, message: `Something went wrong! Please try again later. ${error.message}` }
        };
    }
}
