import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log("⛔DB error occured!"));
db.once("open", () => console.log("✅DB is connected!"));

export default db;
