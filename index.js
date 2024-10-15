import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res ) => {
  
});