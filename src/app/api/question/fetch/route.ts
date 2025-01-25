import Question from "@models/Question";
import User from "@models/User"; // Assuming this model stores user-specific progress
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the request body
        const data = await req.json();
        console.log(data);
        const userId = data.userId;

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Fetch user progress from the database
        const userProgress = await User.findById({ _id: userId });

        let remainingTime = 7200; // Default timer (2 hours) in seconds
        let attemptedAnswers: { _id: string; selectedValue: string }[] = [];


        if (userProgress.timeRemaining) {
            console.log(userProgress.timeRemaining)
            remainingTime = userProgress.timeRemaining;
        }
        (console.log(remainingTime))

        if (userProgress.questionsAttempted) {
            attemptedAnswers = userProgress.questionsAttempted;
        }

        // Fetch and randomize the questions
        const questions = await Question.find();
        const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

        // Remove the 'correct' field from each question
        const sanitizedQuestions = shuffledQuestions.map(({ _doc }) => {
            const { correct, ...rest } = _doc; // Destructure to exclude 'correct'
            return rest;
        });



        // Respond with the sanitized questions, remaining time, and attempted answers
        return NextResponse.json(
            {
                message: "Data fetch successful",
                data: {
                    newQuestions: sanitizedQuestions,
                    remainingTime,
                    attemptedAnswers,
                },
            },
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
