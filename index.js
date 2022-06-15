const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const port = 3005;
let app = express();
app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/forms");
let db = mongoose.connection;
db.on("error", () => console.log("error in db connection"));
db.on("open", () => console.log("db connected sucessfully"));

app.post("/signup", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let ph_no = req.body.ph_no;

  let data = {
    name: name,
    email: email,
    password: password,
    ph_no: ph_no,
  };

  db.collection("lists").insertOne(data, (err) => {
    if (err) throw err;
    console.log("record added successfully!");
  });
  return res.redirect("sign_up_success.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "allow-acess-allow-origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(port, () => {
    console.log(`server is running at ${port}`);
  });
