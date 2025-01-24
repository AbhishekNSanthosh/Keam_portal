import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/User";

export async function POST() {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch non-admin students, sorted by score in descending order
        const students = await User.find({ isAdmin: { $ne: true } })
            .sort({ score: -1 })
            .select("firstName lastName score")
            .lean();

        return NextResponse.json({ success: true, students });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch scores", error },
            { status: 500 }
        );
    }
}
