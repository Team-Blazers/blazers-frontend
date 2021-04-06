// JavaScript Document
const express = require("express"),
bodyParser = require("body-parser");

const app = express();
const Router = require("./routes/router.js");
app.use(bodyParser.urlenconded({extended:false});
app.use(express.json());
app.use(express.static("public"));

//set..
app.set("view engine","ejs");
app.set("port",process.env.PORT || 3000);

Router(app);

app.listen(app.get("port"),()=>{
	console.log("server running on port "+-app.get("port"));
})
