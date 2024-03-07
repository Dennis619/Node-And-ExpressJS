//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
//body parser has the functionality of express you can fail to import it and use express instead
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));
var passwordIsCorrect = false;

app.use(morgan("combined"));//morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));//body-parser middleware //or -> app.use(express.urlencoded.....)

function passwordCheck(req, res, next) {
    var password = req.body.password;
    if(password === "ILoveProgramming")
    {
        passwordIsCorrect = true;
    }
    next();
};
app.use(passwordCheck);

//after the middleware go to route handlers
app.get("/", (req, res) =>{
    res.sendFile(_dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(passwordIsCorrect)
    {
        res.sendFile(_dirname + "/public/secret.html");
    }
    else{
        res.redirect("/");
    }
});

//listen for requests coming to port 3000
app.listen(3000, () =>{
    console.log(`we are listening on ${port}`);
});
