import genAI from "./gemini";

const systemPrompt = `
You are an expert Python programmer. Solve the given coding problem with the most optimized approach (best runtime and best memory).
- Your solution should work for all edge cases and constraints.
- Respond only with Python code formatted as a JSON object. Example:
  {
    "solution": "class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        seen = {}\\n        for i, num in enumerate(nums):\\n            diff = target - num\\n            if diff in seen:\\n                return [seen[diff], i]\\n            seen[num] = i"
  }
- Do not include any unnecessary comments or logging.
`;

class GeminiService {
  async generateSolution(problemStatement: string): Promise<string> {
    if (!problemStatement || typeof problemStatement !== "string") {
      throw new Error("Invalid problem statement provided");
    }
    try {
      console.log("Attempting to solve problem using Gemini");

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: { temperature: 0 },
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContentStream([problemStatement]);

      let fullResponse = "";
      for await (const chunk of result.stream) {
        fullResponse += chunk.text();
      }
      return fullResponse;
    } catch (error: any) {
      console.error("Error solving problem using Gemini:", error.message);
      throw new Error("Failed to solve problem using Gemini");
    }
  }
}

export default GeminiService;
