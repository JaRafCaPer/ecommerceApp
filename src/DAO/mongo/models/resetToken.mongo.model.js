// models/ResetToken.js
import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
user:  {    _id:    {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
                },
            email:  {
                type: String,
                required: true,
                ref: 'User',
                }
        },

token: {
            type: String,
            required: true,
        },
createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600, // Token expires after 1 hour (3600 seconds)
        },
});

export default mongoose.model('ResetToken', resetTokenSchema);