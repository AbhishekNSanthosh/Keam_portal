import { connectToDB } from "@utils/database";
import User from "@models/User";

const Page = async () => {
  // Connect to the database
  await connectToDB();

  // Define the Student interface
  interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }

  // Fetch students who are not admins
  const students: Student[] = (
    await User.find({ isAdmin: { $ne: true } }).lean()
  ).map((user: any) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  }));

  // Render the list of students
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student List
        </h1>
        {students.length > 0 ? (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <p className="text-lg font-medium text-gray-700">
                  <strong>Name:</strong> {student.firstName} {student.lastName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {student.phone || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
