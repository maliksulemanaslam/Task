// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

// server.js
app.get("/search-movies", async (req, res) => {
  const searchQuery = req.query.q;
  const apiKey = "27345213";
  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(
    searchQuery
  )}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const responseData = response.data;
    if (responseData.Response === 'True') {
      res.json(responseData.Search);
    } else {
      res.json([]); // Return an empty array when no movies are found
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});



// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Set up a route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
