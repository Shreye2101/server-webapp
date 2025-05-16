// backend/seed/import-products.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Product = require("../models/Product");

const csvFilePath = path.join(__dirname, "products.csv");

const MONGODB_URI = "mongodb://localhost:27017/your-db-name"; // update this

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    importCSV();
  })
  .catch((err) => console.log("MongoDB connection error:", err));

function importCSV() {
  const products = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      products.push({
        title: row.title,
        description: row.description,
        category: row.category,
        brand: row.brand,
        price: Number(row.price),
        salePrice: Number(row.salePrice),
        totalStock: Number(row.totalStock),
        image: row.image,
      });
    })
    .on("end", async () => {
      try {
        await Product.deleteMany(); // Optional: clear existing
        await Product.insertMany(products);
        console.log("Products inserted:", products.length);
        process.exit();
      } catch (error) {
        console.error("Error inserting products:", error);
      }
    });
}
