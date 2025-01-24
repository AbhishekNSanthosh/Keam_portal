import Question from "@models/Question";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch and randomize the data
        const questions = await Question.find();
        // const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

        // Respond with the shuffled questions
        return NextResponse.json(
            { message: "Data fetch successful", data: questions },
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
