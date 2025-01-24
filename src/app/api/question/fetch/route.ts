import Question from "@models/Question";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch and randomize the data
        const questions = await Question.find();
        const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

        // Remove the 'correct' field from each question
        const sanitizedQuestions = shuffledQuestions.map(({ _doc }) => {
            const { correct, ...rest } = _doc; // Destructure to exclude 'correct'
            return rest;
        });

        // Respond with the sanitized questions
        return NextResponse.json(
            { message: "Data fetch successful", data: sanitizedQuestions },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching questions:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
