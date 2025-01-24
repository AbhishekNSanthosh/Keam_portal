import { connectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Define the Student interface
    interface Student {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      mobile?: string;
    }

    // Fetch students who are not admins
    const students: Student[] = (
        await User.find({ isAdmin: { $ne: true } })
          .sort({ createdAt: -1 })  // Sorting in descending order by createdAt
          .lean()
      ).map((user: any) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
      }));
      

    // Return the student data as JSON response
    return new Response(
      JSON.stringify({ data: students }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
