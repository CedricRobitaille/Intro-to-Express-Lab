const express = require("express");
const app = express();

app.get("/greetings/:userParams", (req, res) => {
  res.send(
    `Hello ${req.params.userParams}, Long time no see!`
  ) 
});

app.get("/greetings", (req,res) => {
  res.send("Hi there,\nI don't believe we've met!")
})


app.get("/roll/:numParams", (req, res) => {
  let responseMsg = "";
  const params = Number(req.params.numParams);
  console.log(params)
  if (!Number.isInteger(params)) {
    responseMsg = `Sorry, but we need a number... ${req.params.numParams} isn't very number-like :sigh:`
  } else {
    const randomNum = parseInt(Math.random()*parseFloat(req.params.numParams));
    responseMsg = `You spinned a ${randomNum}`;
  }
  res.send(responseMsg)
})

app.get("/roll", (req, res) => {
  res.send("Please input a number in the url!")
})








app.listen(3000, ()=> {
  console.log("Listening on port 3000");
})