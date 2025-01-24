import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/User";

export async function POST(req: Request) {
    try {
        // Parse the request body
        const { userId, questionsAttempted, remainingTime } = await req.json();

        // Validate input
        if (!userId || !Array.isArray(questionsAttempted) || remainingTime === undefined) {
            return NextResponse.json(
                { success: false, message: "Invalid input" },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDB();

        // Replace the entire `questionsAttempted` array and update remainingTime
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    questionsAttempted, // Replace with new array
                    remainingTime, // Store the remaining time from the frontend
                    isAttempted: true, // Set `isAttempted` based on array length
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Return success message
        return NextResponse.json({ success: true, message: "Updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
