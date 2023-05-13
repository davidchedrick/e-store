const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Could not connect to MongoDB...", err));

const products = [
	{
		name: "Product 1",
		description: "This is product 1",
		price: 19.99,
		countInStock: 10,
		imageUrl: "http://example.com/product1.jpg",
	},
	{
		name: "Product 2",
		description: "This is product 2",
		price: 29.99,
		countInStock: 20,
		imageUrl: "http://example.com/product2.jpg",
	},
	// add more products
];

Product.deleteMany()
	.then(() => {
		return Product.insertMany(products);
	})
	.then(() => {
		console.log("Data seeded successfully");
		mongoose.connection.close();
	})
	.catch(error => {
		console.error("Error seeding data: ", error);
	});
