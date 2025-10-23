import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
    id: string;
    fullName: string;
    email: string;
    message?: string;
    createdAt: Date;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema: Schema<IClient> = new Schema({
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, validate: { validator: (value: string) => emailRegex.test(value), message: "Email no es válido" } },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Clients || mongoose.model<IClient>("Clients", UserSchema);