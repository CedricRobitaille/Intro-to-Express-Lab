const express = require("express");
const app = express();


// Greetings Pages
app.get("/greetings/:userParams", (req, res) => {
  res.send(
    `Hello ${req.params.userParams}, Long time no see!`
  )
});

app.get("/greetings", (req, res) => {
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
    const randomNum = parseInt(Math.random() * parseFloat(req.params.numParams));
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



// Query Params for SHOES!?!?

// For this specific case, I want to give the user the full list of shoes when then land on the root page
// Did some digging through Stack Overflow, and saw that you can you can do the following:
// res.write("content") -> Starts building the contents for the send.
// A normal res.send() is a fixed operator, however, by using write, we can add multiple pieces of content.
// Once we have all the information, we can use:
// res.end, will tell the browser that we're done writing new stuff!

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get("/shoes", (req, res) => {

  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const type = req.query.type;
  const name = req.query.name;

  let shoeList = shoes;

  if (minPrice || maxPrice || name || type) {
    res.write("<h1>Shoes!!!</h1>");
    res.write("<h3>Query Parameters:</h3>")
    res.write("<ul>");

    // Log the user's search parameters
    if (name) {
      res.write(`<li>Name: ${name}</li>`);
    }
    if (minPrice) {
      res.write(`<li>Min Price: ${minPrice}</li>`);
    }
    if (maxPrice) {
      res.write(`<li>Max Price: ${maxPrice}</li>`);
    }
    if (type) {
      res.write(`<li>Type: ${type}</li>`);
    }
    res.write("</ul>");


    // Search Filtering
    res.write("<h2>Shoe Search Results:</h2>");
    if (minPrice) {
      shoeList = shoeList.filter(shoe => shoe.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      shoeList = shoeList.filter(shoe => shoe.price <= parseInt(maxPrice));
    }
    if (type) {
      shoeList = shoeList.filter(shoe => shoe.type.toLowerCase() === type);
    }
    if (name) {
      shoeList = shoeList.filter(shoe => shoe.name.toLowerCase() === name);
    }

    console.log(shoeList);

    // Search Results Output
    res.write("<ul>")
    shoeList.forEach((shoe) => {
      res.write(`
      <li>${shoe.name},\nPrice: ${shoe.price},\nType: ${shoe.type}</li>
      `);
    })
    res.write("</ul>")
  }

  // Check for no search results!
  if (!minPrice && !maxPrice && !name && !type || shoeList.length === 0) {
    res.write("<p>Uh oh, Looks like we couldn't find anything with those search parameters :(</p>");
    res.write("<p>Why don't you take a look at our other kicks, to see if there's anything you like!</p>");
    res.write("<ul>")
    shoes.forEach((shoe) => {
      // Sends new data for each shoe element
      res.write(`
      <li>${shoe.name},\nPrice: ${shoe.price},\nType: ${shoe.type}</li>
    `);
    })
    res.write("</ul>")
  }

  res.end();

});


//
app.listen(3000, () => {
  console.log("Listening on port 3000");
})