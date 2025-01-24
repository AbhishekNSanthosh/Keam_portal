import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        await connectToDB();
        const students = User.find({ filter: { admin: true } })
        return NextResponse.json(
            { message: "Data fetch successful", data: students },
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
