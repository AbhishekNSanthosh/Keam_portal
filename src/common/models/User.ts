import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false  // Optional field
    },
    score: {
        type: Number,
        default: 0
    },
    questionsAttempted: [
        {
            Question: {
                type: Schema.Types.ObjectId,
                ref: "Question"
            },
            submittedAnswer: {
                type: String
            }
        }
    ],
    isAttempted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSubmitted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
