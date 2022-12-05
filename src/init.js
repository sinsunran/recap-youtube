import "./db";
import app from "./server";

const PORT = 4000;

const handleListen = () =>
  console.log(`✅your server is now listen on port ${PORT}🚀`);
app.listen(PORT, handleListen);
