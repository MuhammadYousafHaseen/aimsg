import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose"; // Import the entire mongoose object

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> } // Next.js expects params as a Record<string, string>
) {
  // Extract message ID from URL parameters.
  const messageid = context.params.messageid;
  if (!messageid) {
    return NextResponse.json(
      { success: false, message: "Invalid message ID" },
      { status: 400 }
    );
  }

  // Connect to the database.
  await dbConnect();

  // Get the current session.
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "You must be signed in to delete messages." },
      { status: 401 }
    );
  }

  // Find the user by session user ID.
  const user = await UserModel.findById(session.user._id);
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  try {
    // Use an aggregation pipeline update to remove the message with the given ID.
    // The pipeline filters out the message where $$msg._id equals the provided messageid.
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      [
        {
          $set: {
            messages: {
              $filter: {
                input: "$messages",
                as: "msg",
                cond: { $ne: ["$$msg._id", new mongoose.Types.ObjectId(messageid)] },
              },
            },
          },
        },
      ]
    );

    if (updatedResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}
