import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const sampleProducts = [
  { name: "Wireless Headphones", price: 1999, image: "https://via.placeholder.com/300", description: "High-quality wireless headphones", category: "Audio", countInStock: 25 },
  { name: "Smart Watch", price: 2999, image: "https://via.placeholder.com/300", description: "Fitness smart watch", category: "Wearable", countInStock: 12 },
  { name: "Bluetooth Speaker", price: 1499, image: "https://via.placeholder.com/300", description: "Portable speaker with deep bass", category: "Audio", countInStock: 30 }
];

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Seeding DB...");

    // create admin user if not exists
    let admin = await User.findOne({ email: "admin@example.com" });
    if (!admin) {
      admin = new User({ name: "Admin", email: "admin@example.com", isAdmin: true });
      await admin.setPassword("admin1234");
      await admin.save();
      console.log("Created admin user -> admin@example.com / admin1234");
    }

    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Inserted sample products");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

run();
