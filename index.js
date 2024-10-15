import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { marked } from 'marked';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Gemini Stuff Starts here
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let prompt = '';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res ) => {
  res.render(`${__dirname}/views/index.ejs`);
});

app.post('/submit', (req, res) =>{
  prompt = req.body['information'] + ". Can you format the response in HTML ELements. Like, the response is going to display over on a webpage so make it webpage friendly. Make it look good too. Lastly, only write the output. No other nonsense needed";
  (async () => {
    try {
      const result = await model.generateContent(prompt);
      const output = result.response.text();
      console.log(output);

      //Displaying the output to a new page
      // const formattedOutput = marked(output);
      res.render(`${__dirname}/views/response.ejs`, {answer: output});

    } catch (error) {
      console.error("Error generating content:", error);
    }
  })();
});