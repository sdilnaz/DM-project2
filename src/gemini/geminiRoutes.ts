import { Router, Request, Response } from "express";
import GeminiService from "./geminiService";
import GeminiController from "./geminiController";

const geminiRouter = Router();
const geminiService = new GeminiService();
const geminiController = new GeminiController(geminiService);

geminiRouter.post("/generate-solution", geminiController.generateSolution);

export default geminiRouter;
