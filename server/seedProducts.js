require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const newArrivals = require("./data/Newarrival");


async function seedDB() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGO_URI is undefined. Please set it in your .env file."
      );
    }

    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB Atlas");

    const deleted = await Product.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing products`);

    const inserted = await Product.insertMany(newArrivals);
    console.log(`✅ Inserted ${inserted.length} new products`);

    const count = await Product.countDocuments();
    const sample = await Product.findOne();
    console.log(`📦 Total products in DB: ${count}`);
    console.log("🔍 Sample product:", sample);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
