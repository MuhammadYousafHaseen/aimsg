// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;


// export async function POST(req: Request) {
//  try {
//     const { messages } = await req.json();

//     const result = streamText({
//       model: openai('gpt-4o'),
//       messages,
//     });
  
//     return result.toDataStreamResponse();
//  } catch (error) {
//      console.log("An Unexpected Error in suggesting message: ", error);
//      return Response.json({ success: false, message: "Error in suggesting message" }, { status: 500 });
//  }
// }
// //mongodb+srv://YousafHaseen:tehseenyousaf@haseen0.rspee.mongodb.net
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST() {
  try {
    // Custom prompt to generate three open-ended questions separated by '||'
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'.";

    // Stream the AI-generated text using the GPT-4o model
    const result = await streamText({
      model: openai("gpt-4o"),
      prompt,
    });

    console.log("API Response:", result);

    // Return a streaming response to the client
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in AI response:", error);
    return NextResponse.json(
      { success: false, message: "Error generating response" },
      { status: 500 }
    );
  }
}

