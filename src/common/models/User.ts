import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    mobile: {
      type: String, // Optional field
      required: false,
    },
    timeRemaining: {
      type: Number,
      default: 7200,
    },
    score: {
      type: Number,
      default: 0,
    },
    attemptedQuestions: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    incorrectAnswers: {
      type: Number,
      default: 0,
    },
    questionsAttempted: [
      {
        Question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedValue: {
          type: String,
        },
      },
    ],
    isAttempted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
