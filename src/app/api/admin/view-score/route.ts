import User from "@models/User"; // Replace with the correct path to your User model
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch non-admin users and sort them by score in descending order
        const students = await User.find({ isAdmin: { $ne: true } })
            .sort({ score: -1 }) // Sort by score (highest first)
            .select("firstName lastName score attemptedQuestions correct correctAnswers incorrectAnswers") // Select only required fields
            .lean(); // Return plain JavaScript objects

        // Return the students' scores in the response
        return NextResponse.json(
            { message: "Scores fetched successfully", data: students },
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
