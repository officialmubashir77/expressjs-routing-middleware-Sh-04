const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// middleware for parsing JSON
app.use(express.json());

// middleware
// jb bhi server req accept karta hy whan se route ke beech phnchny tk agar ap us request ko beech me rokty hoo and kuch perform karty hoo toh ye element middleware kehlta hy.


// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
});

app.use((req, res, next) => {
    console.log(`Middleware chala 1 or bar`);
    next(); // Pass control to the next middleware
});

// endpoints or routes create karna
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

//Profile route
app.get('/profile', (req, res) => {
  res.send('Welcome to the Profile Page!');
});


//Post Request
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age || age <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const user = { id: Date.now(), name, email, age };
    console.log(user);
    res.status(201).json(user);
});



//Error Handling 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


// Listening the server on the port 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});