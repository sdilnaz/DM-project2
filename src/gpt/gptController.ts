import GptService from "./gptService";
import { Request, Response } from "express";

class GptController {
  private gptService: GptService;

  constructor(gptService: GptService) {
    this.gptService = gptService;
  }

  generateSolution = async (req: Request, res: Response) => {
    try {
      const { problemStatement } = req.body;
      if (!problemStatement || typeof problemStatement !== "string") {
        throw new Error("Invalid problem statement provided");
      }
      const solution = await this.gptService.generateSolution(problemStatement);

      const parsedSolution = JSON.parse(solution);
      const formattedSolution = parsedSolution.solution.replace(/\\n/g, "\n");
      console.log("Solution:\n", formattedSolution);

      res.status(201).json(parsedSolution);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GptController;
