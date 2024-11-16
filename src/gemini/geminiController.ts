import { Request, Response } from "express";
import GeminiService from "./geminiService";

class GeminiController {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  generateSolution = async (req: Request, res: Response) => {
    try {
      const { problemStatement } = req.body;
      if (!problemStatement || typeof problemStatement !== "string") {
        throw new Error("Invalid problem statement provided");
      }
      const solution = await this.geminiService.generateSolution(
        problemStatement
      );

      const cleanedSolution = solution
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "");

      console.log("Cleaned Solution Response:", cleanedSolution);

      let parsedSolution;
      try {
        parsedSolution = JSON.parse(cleanedSolution);
      } catch (parseError) {
        throw new Error("Failed to parse solution response");
      }

      const formattedSolution = parsedSolution.solution.replace(/\\n/g, "\n");
      console.log("Formatted Solution:\n", formattedSolution);

      res.status(201).json({ solution: formattedSolution });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GeminiController;
