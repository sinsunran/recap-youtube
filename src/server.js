import express from "express";
import morgan from "morgan";

const PORT = 4500;

const app = express();
const logger = morgan("dev");

app.use(logger);

app.get("/", (req, res) => {
  console.log(res);
  res.send('somebody trying to get " / "');
});
const handleListening = () =>
  console.log(`✅Server listening on port ${PORT}🚀`);

app.listen(PORT, handleListening);
