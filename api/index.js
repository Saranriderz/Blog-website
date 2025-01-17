const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts"); 
const multer = require("multer"); 

dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
         // The options useNewUrlParser, useUnifiedTopology, and useCreateIndex are no longer necessary
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    //images storing
    const storage = multer.diskStorage({
        destination:(req, file, cb)  => {
            cb(null, "images");
        },
        filename: (req, file, cb)  => {
            cb(null, req.body.name);
        }
    })

    //upload the file
    const upload = multer({storage:storage});
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    })

    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);

app.listen("7733", () => {
    console.log("Backend is running.");
});
