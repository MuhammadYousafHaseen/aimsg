import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { messageid: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "You must be signed in to delete messages." },
      { status: 401 }
    );
  }

  try {
    const objectId = new mongoose.Types.ObjectId(params.messageid);
    const updatedResult = await UserModel.updateOne(
      { _id: user._id, "messages._id": objectId },
      { $set: { "messages.$.deleted": true } } // Example: Marking the message as deleted
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
