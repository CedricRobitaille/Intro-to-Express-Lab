const express = require("express");
const app = express();


// Greetings Pages
app.get("/greetings/:userParams", (req, res) => {
  res.send(
    `Hello ${req.params.userParams}, Long time no see!`
  ) 
});

app.get("/greetings", (req,res) => {
  res.send("Hi there,\nI don't believe we've met!")
})


// Roll Pages
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



// Collectibles Pages
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


app.get("/collectibles/:indexParams", (req, res) => {
  const index = parseInt(req.params.indexParams);
  if (index >= 0 && index < collectibles.length) {
    res.send(`
      <h1>Ah, a man of culture, eh?</h1>
      <p>For ${collectibles[index].price} buckaroos, this ${collectibles[index].name} can be yours!</p>
      `)
  } else {
    res.send(`Sorry bud, but we're fresh outta stock on that one :(`)
  }
})

app.get("/collectibles", (req, res) => {
  res.send(`
    <h1>Your Collectibles:</h1>
    <ul>
      <li>0: Shiny Ball</li>
      <li>1: Autographed Pictures of a Dog</li>
      <li>2: Vintage 1970s yogurt SOLD AS-IS (Special blue fuzzy edition!!!)</li>
    </ul>
    `)
})










app.listen(3000, ()=> {
  console.log("Listening on port 3000");
})