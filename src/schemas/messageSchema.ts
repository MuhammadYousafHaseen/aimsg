import {z} from "zod"

export const messageSchema = z.object({
   content: z
   .string()
   .min(10, {message:"Message should be at least 10 characters long"})
   .max(300,{message:"Message should be no longer than 300 characters"})

})