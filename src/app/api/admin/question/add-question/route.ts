import Question from "@models/Question";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Connect to the database
        await connectToDB();

        // Get the question data from the request body
        const { question, a, b, c, d, e, correct } = await req.json();

        // Create a new question in the database
        const newQuestion = new Question({
            question,
            a,
            b,
            c,
            d,
            e,
            correct,
        });

        // Save the new question to the database
        await newQuestion.save();

        // Return the success response
        return NextResponse.json(
            { message: "Question added successfully", data: newQuestion },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
