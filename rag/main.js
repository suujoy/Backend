import "dotenv/config";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";

import fs from "fs";
import { MistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import { json, text } from "stream/consumers";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.index("cohort2rag");

// const dataBuffer = fs.readFileSync("./sneha.pdf"); 

// const parser = new PDFParse({
//     data: dataBuffer,
// });

// const data = await parser.getText();

const embaddings = new MistralAIEmbeddings({
    model: "mistral-embed",
    apiKey: process.env.MISTRAL_API_KEY,
});

// const spliter = new RecursiveCharacterTextSplitter({      
//     chunkSize: 300,
//     chunkOverlap: 0,
// });

// const chunks = await spliter.splitText(data.text);

// const docs = await Promise.all(
//     chunks.map(async (chunk) => {
//         const embadding = await embaddings.embedQuery(chunk);
//         return {
//             text: chunk,
//             embadding,
//         };
//     }),
// );

// const results = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embadding,
//         metadata: {
//             text: doc.text,
//         },
//     })),
// });


const qyeryEmabddings =await embaddings.embedQuery('how was the sneha internship')

const results = await index.query({
    vector: qyeryEmabddings,
    topK: 2,
    includeMetadata: true,
    
})

console.log(JSON.stringify(results))