import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let information = '';

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
  information = req.body['information'];
  console.log(`Information: ${information}`);
});