import User from "@models/User"; // Import your User model
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        // Parse the request body to get the user ID
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDB();

        // Fetch the user details by ID
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Remove sensitive data (e.g., password) from the user object
        const { score, ...sanitizedUser } = user._doc;

        // Respond with the user details
        return NextResponse.json(
            { message: "User fetched successfully", data: sanitizedUser },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching user details:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
