const mongoose = require("mongoose");

const { DATABASE_URL, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } = process.env;

mongoose.connect(`mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("db connected");
});