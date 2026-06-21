import "dotenv/config";

import { PDFParse } from "pdf-parse";

import fs from "fs";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { MistralAIEmbeddings } from "@langchain/mistralai";

import { Pinecone } from "@pinecone-database/pinecone";

const model = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed",
});

const buffer = fs.readFileSync("../story.pdf");

const parser = new PDFParse({ data: buffer });

const result = await parser.getText();

const splitter = await new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 0,
});
const chunks = await splitter.splitText(result.text);

const embeddings = await Promise.all(
    chunks.map(async (chunk) => {
        const embedding = await model.embedQuery(chunk);
        return { chunk, embedding };
    }),
);

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
});

const index = pc.Index("cohort-2-rag");

const results = await index.upsert({
    records: embeddings.map((doc, i) => {
        return {
            id: `doc-${i}`,
            values: doc.embedding,
            metadata: { text: doc.chunk },
        };
    }),
});


console.log(results);