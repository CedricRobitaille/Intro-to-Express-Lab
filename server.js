const express = require("express");
const app = express();

app.get("greetings/:userParams", (req, res) => {
  res.send(
    `Hello ${req.params.userParams}`
  ) 
});

app.get("/greetings", (req,res) => {
  res.send("Heya!")
})

app.listen(3000, ()=> {
  console.log("Listening on port 3000");
})