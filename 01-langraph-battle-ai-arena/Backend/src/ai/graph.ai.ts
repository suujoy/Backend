import {
    StateSchema,
    MessagesValue,
    type GraphNode,
    StateGraph,
    START,
    END,
} from "@langchain/langgraph";
import z from "zod";
import { cohereModel, googleModel, mistralModel , groqModel} from "./models.ai.js";

import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default(""),
    }),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
    const [mistralResponse, cohereResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem),
    ]);

    return {
        solution_1: mistralResponse.content as string,
        solution_2: cohereResponse.content as string,
    };
};

const judgeNode: GraphNode<typeof State> = async (state) => {
    const { problem, solution_1, solution_2 } = state;

    const judge = createAgent({
        model: groqModel,
        tools: [],
        responseFormat: providerStrategy(
            z.object({
                solution_1_score: z.number().min(0).max(10),
                solution_2_score: z.number().min(0).max(10),
                solution_1_reasoning: z.string(),
                solution_2_reasoning: z.string(),
            }),
        ),
    });

    const judgeResponse = await judge.invoke({
        messages: [
            `
            Problem: ${problem}
            Solution 1: ${solution_1}
            Solution 2: ${solution_2}
            Please score each solution on a scale of 0 to 10 and provide reasoning for your scores.

            `,
        ],
    });

    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning,
    } = judgeResponse.structuredResponse;

    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning,
        },
    };
};

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge_node", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge_node")
    .addEdge("judge_node", END)
    .compile();

export default async function (problem: string) {
    const result = await graph.invoke({
        problem: problem,
    });

    return result;
}
