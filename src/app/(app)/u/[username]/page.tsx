// "use client";

// import { useParams } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { messageSchema } from "@/schemas/messageSchema";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// export default function PublicProfilePage() {
//   const params = useParams();
//   const username = params?.username as string; // Ensure username is a string
//   const { toast } = useToast();
//   const [isAcceptingMessages, setIsAcceptingMessages] = useState<boolean | null>(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch user message settings
//   useEffect(() => {
//     if (!username) return;
//     const fetchUserStatus = async () => {
//       try {
//         const response = await axios.get(`/api/accept-message`);
     
              
//         setIsAcceptingMessages(response.data.isAcceptingMessage);
//         if(response.data.isAcceptingMessage === true){
//         toast("Success!",{
//           description:"User Status Fetched Successfully"
//         })} else {
//           toast("Error!",{
//             description:"User is not accepting messages"
//           })
//         }
//       } catch (error) {
//         console.error("Error fetching user status:", error);
//         toast("Error!", { description: "Failed to load user status." });
//       }
//     };
//     fetchUserStatus();
//   }, [username]);

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     if (!username) {
//       toast("Error!", { description: "Invalid username." });
//       return;
//     }

//     if (!isAcceptingMessages) {
//       toast("Error!", { description: "User is not accepting messages." });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("/api/send-message", {
//         content: data.content,
//         username: username,
//       });

//       if (response.status === 200) {
//         toast("Success!", { description: "Message sent successfully!" });
//         form.reset();
//       }
//     } catch (error) {
//       console.error("Error in sending message:", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       const errorMessage = axiosError.response?.data.message ?? "Failed to send message.";
//       toast("Error!", { description: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-4 dark:text-white bg-gray-100 dark:bg-gray-900">
//       <h1 className="text-3xl font-bold mb-4">Public Profile Page</h1>

//       <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl">
//         {isAcceptingMessages === null ? (
//           <p className="text-center text-gray-500 dark:text-gray-400">Loading user status...</p>
//         ) : (
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700 dark:text-gray-300">
//                       Your Message to @{username}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Type your message here..."
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </Button>
//             </form>
//           </Form>
//         )}
//       </div>
//     </div>
//   );
// }
// const fetchSuggestedMessages = async () => {
  //   setLoading(true);
    // try {
    //   const { messages, handleSubmit } = useChat();
      // const responsedMessageArray = messages.parts
  //const generatedMessages = messages.split("||").map((q: string) => q.trim());
  // setSuggestedMessages(generatedMessages);
    // } catch (error) {
    //   console.error("Error fetching suggestions:", error);
    //   toast("Error!", { description: "Failed to fetch suggestions." });
      
    // }
  //   try {
  //     const response = await axios.post("/api/chat", {
  //       responseType: "stream",
  //     });

  //     // Handle streaming response
  //     const reader = response.data.getReader();
     
  //     const decoder = new TextDecoder();
  //     let resultText = "";

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;
  //       resultText += decoder.decode(value, { stream: true });
  //     }

  //     // Process response into array (split by "||")
  //     const generatedQuestions = resultText.split("||").map((q) => q.trim());
  //     setSuggestedMessages(generatedQuestions);
  //   } catch (error) {
  //     console.error("Error fetching suggestions:", error);
  //     toast("Error!", { description: "Failed to fetch suggestions." });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

   // Automatically trigger AI-generated messages on page load
  //  useEffect(() => {
  //   handleSubmit();
  //   if(!messages){
  //     toast("Error!", { description: "Failed to fetch suggestions." });
  //   }
  //   console.log(messages);
  // }, []);
 


//Optimised code with better experience 
"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import customMessages from "@/data/messages.json";
import { useChat } from "@ai-sdk/react";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { toast } = useToast();
  const [isAcceptingMessages, setIsAcceptingMessages] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const { messages } = useChat();

  // Fetch user status from API
  useEffect(() => {
    if (!username) return;
    const fetchUserStatus = async () => {
      try {
        const { data } = await axios.get(`/api/accept-message`);
        setIsAcceptingMessages(data.isAcceptingMessage);
        toast("Success!", { description: "User status fetched successfully." });
      } catch (error) {
        console.error("Error fetching user status:", error);
        toast("Error!", { description: "Failed to load user status." });
      }
    };
    fetchUserStatus();
  }, [username, toast]);

  // If AI suggestions are not coming, show an error toast
  useEffect(() => {
    if (!messages || messages.length === 0) {
      toast("AI Error!", {
        description: "Failed to generate AI messages. You can click on any custom message provided or write your own message.",
      });
    }
  }, [messages, toast]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    if (!username)
      return toast("Error!", { description: "Invalid username." });
    if (!isAcceptingMessages)
      return toast("Error!", { description: "User is not accepting messages." });

    setLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        content: data.content,
        username,
      });
      if (response.status === 200) {
        toast("Success!", { description: "Message sent successfully!" });
        form.reset();
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error!", {
        description: axiosError.response?.data.message ?? "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Public Profile Page</h1>

      {/* Message Form */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl">
        {isAcceptingMessages === null ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading user status...
          </p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Your Message to @{username}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your message here..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        )}
      </div>

      {/* Suggested Messages Section */}
      <div className="flex flex-col w-full max-w-2xl mx-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center space-y-4">
            {/* <p className="text-center text-gray-500 dark:text-gray-400">
              Loading suggested messages...
            </p> */}
            {customMessages.map((message, index) => (
              <Card
                key={index}
                className="cursor-pointer bg-gray-100 dark:bg-gray-800 shadow-md rounded-xl transition-transform hover:scale-105"
                onClick={() => form.setValue("content", message.content)}
              >
                <CardContent className="p-4">
                  <div className="py-2 text-gray-800 dark:text-white font-medium">
                    {message.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message) => (
              <Card
                key={message.id}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl shadow-md"
              >
                <CardContent className="text-gray-900 dark:text-white">
                  <p className="font-semibold">
                    {message.role === "user" ? "User" : "AI"}:
                  </p>
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <p key={`${message.id}-${i}`} className="break-words">
                        {part.text}
                      </p>
                    ) : null
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
