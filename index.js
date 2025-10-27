const express = require("express");
const dbConnection = require("./db/dbConnection.db");
const PORT = 3000;

let app = express();

app.use(express.json());

dbConnection();

app.use("/instagram/auth", require("./Routes/AuthRoute"));
app.use("/instagram/post", require("./Routes/postRoute"));
app.use("/instagram/post/like", require("./Routes/likeRoute"));
app.use("/instagram/post/comments", require("./Routes/commentRoute"));
app.use("/instagram/followStatus", require("./Routes/followRoute"))


app.listen(PORT, () => console.log(`Server Running on ${PORT}`))