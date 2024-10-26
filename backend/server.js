const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Import CORS
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

const FILE_PATH = "items.json"; // Path to the JSON file

// Load existing items from the file
let items = [];
if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH);
  items = JSON.parse(data);
}

// Save items to the file
const saveItems = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(items, null, 2));
};

// Create - Add a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  saveItems(); // Save to file
  res.status(201).json(newItem);
});

// Read - Get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// Read - Get a specific item by ID
app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Update - Update a specific item by ID
app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    saveItems(); // Save to file
    res.json(items[index]);
  } else {
    res.status(404).send("Item not found");
  }
});

// Delete - Remove a specific item by ID
app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    saveItems(); // Save to file
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
