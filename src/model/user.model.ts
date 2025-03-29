import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    content:string;
    createdAt:Date;
}

const messageSchema: Schema<Message> =  new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required:true, default: Date.now }
});

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages: Message[]
}

const userSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required!"],
        trim:true,
        uniquie:true
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        uniquie:true,
        match:[/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/ , "Please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        minlength:[6,"Password must be at least 6 characters long"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required!"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required!"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[messageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema); // if the model already exists, use it, otherwise create a new one

export default UserModel;

