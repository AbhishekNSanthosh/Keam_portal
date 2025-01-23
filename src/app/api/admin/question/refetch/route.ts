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

        // Return the shuffled data in the response
        return NextResponse.json(
            { message: "Data fetch successful", data: shuffledQuestions },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
