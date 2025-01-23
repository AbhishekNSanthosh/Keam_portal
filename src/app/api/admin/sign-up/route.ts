import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const data = await req.json();

    try {
        // Connect to the database
        await connectToDB();

        // Create a new user with additional fields
        const newUser = new User({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            mobile: data.mobile || "",  // Optional, default to empty string if not provided
        });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({ message: "New User Added" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
