import mongoose from 'mongoose';
import { hash,compareSync, hashSync } from 'bcryptjs';

const resetTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
});

resetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const hashed = await hashSync(this.token, 10);
        this.token = hashed;
    }
    next(); // Move next() inside the callback function
});



// Check if the model already exists before defining it
const ResetToken = mongoose.models.ResetToken || mongoose.model('ResetToken', resetTokenSchema);

export default ResetToken;
