import express from "express";
import ffmpeg from "fluent-ffmpeg";
import { read, readSync } from "fs";

const app = express();

app.post("/process-video",  (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.inputFilePath;

    if (!outputFilePath) {
        res.status(400).send("Bad Request: Missing output file path.");
    }
    if (!inputFilePath) {
        res.status(400).send("Bad Request: Missing input file path.");
    }

    ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360") // 360p
    .on("end", () => {
        res.status(200).send("Processing finished successfully.")
    })
    .on("error", (err) => {
        console.log(`An error occurred: ${err.message}`);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Video Processing service listening at http://localhost:${port}`);
});3

