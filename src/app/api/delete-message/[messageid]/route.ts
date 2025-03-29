import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // ✅ Ensure Correct Import
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";

// export async function DELETE(
//   req: NextRequest,
//   context: { params: { messageid: string } }
// ) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   const user = session?.user as User;

//   if (!session || !user) {
//     return NextResponse.json(
//       { success: false, message: "You must be signed in to delete messages." },
//       { status: 401 }
//     );
//   }

//   // const messageid:string = context?.params?.messageid;
//   const messageid: string = context.params!.messageid;

//   if (!messageid) {
//     return NextResponse.json(
//       { success: false, message: "Invalid message ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedResult = await UserModel.updateOne(
//       { _id: user._id },
//       { $pull: { messages: { _id: messageid } } }
//     );

//     if (updatedResult.modifiedCount === 0) {
//       return NextResponse.json(
//         { success: false, message: "Message not found or already deleted" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Message deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting message:", error);
//     return NextResponse.json(
//       { success: false, message: "Error deleting message" },
//       { status: 500 }
//     );
//   }
// }
export async function DELETE(req: NextRequest, context: { params: { messageid: string } }) {
  const messageid = context.params?.messageid; // No need to await

  if (!messageid) {
    return NextResponse.json(
      { success: false, message: "Invalid message ID" },
      { status: 400 }
    );
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "You must be signed in to delete messages." },
      { status: 401 }
    );
  }

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
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
