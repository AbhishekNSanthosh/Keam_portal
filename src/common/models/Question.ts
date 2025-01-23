import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
    question: {
        type: String,
    },
    a: {
        type: String
    },
    b: {
        type: String
    },
    c: {
        type: String
    },
    d: {
        type: String
    },
    e: {
        type: String
    },
    correct: {
        type: String
    },
    mark: {
        type: Number,
        default: 4
    },
    negativeMark: {
        type: Number,
        default: -1
    },
}, { timestamps: true });

const Question = models.Question || model("Question", QuestionSchema);
export default Question;
