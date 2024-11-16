import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;
