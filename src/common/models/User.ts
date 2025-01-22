import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    isAttempted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
