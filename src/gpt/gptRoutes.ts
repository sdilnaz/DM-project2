import { Router, Request, Response } from "express";
import GptService from "./gptService";
import GptController from "./gptController";

const gptRouter = Router();
const gptService = new GptService();
const gptController = new GptController(gptService);

gptRouter.post("/generate-solution", gptController.generateSolution);

export default gptRouter;
