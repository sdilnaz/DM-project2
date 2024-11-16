import openai from "./openai";
import { Buffer } from "buffer";

const systemPrompt = `
You are an expert Python programmer. Solve the given coding problem with the most optimized approach (best runtime and best memory).
- Your solution should work for all edge cases and constraints.
- Respond only with Python code formatted as a JSON object. Example:
  {
    "solution": "class Solution:\\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\\n        seen = {}\\n        for i, num in enumerate(nums):\\n            diff = target - num\\n            if diff in seen:\\n                return [seen[diff], i]\\n            seen[num] = i"
  }
- Do not include any unnecessary comments or logging.
`;

class GptService {
  async generateSolution(problemStatement: string): Promise<string> {
    if (!problemStatement || typeof problemStatement !== "string") {
      throw new Error("Invalid problem statement provided");
    }
    try {
      console.log("Attempting to solve problem");

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Solve the following problem in Python:\n\n${problemStatement}`,
          },
        ],
        max_tokens: 1500,
      });
      if (
        !response ||
        !response.choices ||
        !response.choices[0].message ||
        !response.choices[0].message.content
      ) {
        throw new Error("Invalid response format from OpenAI");
      }

      const resJson: string = response.choices[0].message.content;

      return resJson;
    } catch (error: any) {
      console.error("Error evaluating image:", error.message);
      throw new Error("Failed to solve problem  using OpenAI");
    }
  }
}
export default GptService;
