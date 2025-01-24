import { connectToDB } from "@utils/database";
import User from "@models/User";

export const revalidate = 60;

const ViewScoreContent = async () => {
  await connectToDB();

  const students = await User.find({ isAdmin: { $ne: true } })
    .sort({ score: -1 })
    .select("firstName lastName score")
    .lean();

  return (
    <div className="h-full bg-white flex items-center justify-center py-8">
      <div className="bg-white shadow-sm rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student Rankings
        </h1>
        {students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={(student._id as string) || index.toString()}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-700">
                  <strong>Rank {index + 1}:</strong> {student.firstName}{" "}
                  {student.lastName}
                </p>
                <p className="text-gray-600">Score: {student.score}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewScoreContent;
