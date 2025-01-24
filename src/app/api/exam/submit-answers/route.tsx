import Question from "@models/Question";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { answers, userId } = await req.json();
    console.log(answers, userId);
    if (!answers || !userId) {
      return NextResponse.json(
        { message: "Invalid request: answers or userId missing" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Initialize the score
    let score = 0;

    // Iterate through each answer
    for (const answer of answers) {
      // Find the question from the database using _id
      const question = await Question.findById(answer._id);

      // If question not found, continue to the next answer
      if (!question) continue;
      console.log(answer.selectedValue, "===", question.correct);
      // Check if chosen option matches the correct option in the question
      if (answer.selectedValue === question.correct) {
        // If correct, increment score by 4
        score += 4;
      } else {
        // If incorrect, decrement score by 1
        score -= 1;
      }
    }

    // Update the User model with the calculated score
    await User.findByIdAndUpdate(userId, { score: score });

    // Prepare response with the calculated score
    const response = {
      message: "Exam completed successfully",
      score,
    };

    // Send the success response
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error handling the exam submission:", error);
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";

    // Return error response
    return NextResponse.json(
      { message, error: "Failed to process exam submission" },
      { status }
    );
  }
};
