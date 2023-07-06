import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.API_KEY,
        },
        body: JSON.stringify(req.body),
    })
    .then(data => data.json())
    .then(
        data => {
            if (data.error) {
                console.error(data);
                res.status(400).json(data);
            }
            res.status(200).json(data);
        }
    )
    .catch(err => {
        console.error(err);
        res.status(400).json(err);
    });
});

app.listen(process.env.PORT, () => console.log(`app is running on ${process.env.PORT}`));