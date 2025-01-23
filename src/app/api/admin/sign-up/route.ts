import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const data = await req.json();

    try {
        connectToDB();
        const newUser = new User({
            email: data.email,
            dob: data.dob
        })
        newUser.save();
        return NextResponse.json({ message: "New User Added" }, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
    }
}