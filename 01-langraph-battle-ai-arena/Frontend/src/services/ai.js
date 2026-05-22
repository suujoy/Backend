import axios from "axios";

/**
 * Mocks a streaming AI response
 * @param {string} fullText - The full text to stream
 * @param {function} onChunk - Callback for each chunk
 * @returns {Promise<void>} Resolves when streaming is complete
 */
const mockStream = async (fullText, onChunk) => {
    const chunks = fullText.split(/(\s+)/); // Split by words and spaces
    let currentText = "";

    for (const chunk of chunks) {
        currentText += chunk;
        onChunk(currentText);
        // Random delay between 10ms and 50ms to simulate network/generation
        const delay = Math.floor(Math.random() * 40) + 10;
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
};

/**
 * Mock data representing the backend response format
 */
// const getMockResponses = (prompt) => {
//     return {
//         solution_1: `Here is a solution using **Model Alpha**.\n\nThe capital of India is New Delhi. It is a bustling metropolis that beautifully blends historical grandeur with modern dynamism.\n\n\`\`\`javascript\nconsole.log("Welcome to New Delhi!");\n\`\`\`\n\nHope this helps!`,
//         solution_2: `This is **Model Beta** responding.\n\nNew Delhi is the capital of India. It's known for its tree-lined boulevards, monumental architecture, and vibrant street life, serving as the political heart of the country.\n\n\`\`\`python\nprint("Hello from New Delhi!")\n\`\`\`\n\nLet me know if you need more details.`,
//         judge: {
//             solution_1_score: 8,
//             solution_2_score: 9,
//             solution_1_reasoning:
//                 "Model Alpha provides a solid answer and includes a Javascript snippet. However, the description is a bit generic.",
//             solution_2_reasoning:
//                 "Model Beta captures the essence of the city's beauty more vividly with mentions of architecture and boulevards. The Python snippet is also a nice touch.",
//         },
//     };
// };

/**
 * Simulates a full debate cycle (Model 1 & 2 stream -> Judge streams)
 */
export const runDebate = async (prompt, callbacks) => {
    const { onModel1Update, onModel2Update, onJudgeUpdate, onComplete } =
        callbacks;

    const { data } = await axios.post("http://localhost:3000/invoke", {
        input: prompt,
    });

    // console.log(data);

    const mockData = data.result;

    // 1. Both models start streaming simultaneously
    const model1Stream = mockStream(mockData.solution_1, onModel1Update);
    const model2Stream = mockStream(mockData.solution_2, onModel2Update);

    await Promise.all([model1Stream, model2Stream]);

    // 2. Wait a moment before judge starts
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 3. Judge streams its response
    // We'll stream a combined text for the judge or just pass the final object
    // For the sake of the UI, we can stream the reasoning.
    let judgeProgress = {
        ...mockData.judge,
        solution_1_reasoning: "",
        solution_2_reasoning: "",
    };

    // We'll just stream one after another for simplicity in the mock
    await mockStream(mockData.judge.solution_1_reasoning, (text) => {
        judgeProgress.solution_1_reasoning = text;
        onJudgeUpdate({ ...judgeProgress });
    });

    await mockStream(mockData.judge.solution_2_reasoning, (text) => {
        judgeProgress.solution_2_reasoning = text;
        onJudgeUpdate({ ...judgeProgress });
    });

    // 4. Complete
    onComplete({
        problem: prompt,
        ...mockData,
    });
};
