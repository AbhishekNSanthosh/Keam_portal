import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import User from "@models/User";

export async function POST() {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch students who are not admins
        const students = await User.find({ isAdmin: { $ne: true } })
            .select("firstName lastName email phone") // Fetch only required fields
            .lean();

        return NextResponse.json({ success: true, students });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch data", error }, { status: 500 });
    }
}
