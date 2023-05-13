const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Get single product
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}

		res.json(product);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.status(500).send("Server Error");
	}
});

// Create a product
router.post("/", async (req, res) => {
	const { name, description, price, image } = req.body;

	try {
		const newProduct = new Product({
			name,
			description,
			price,
			image,
		});

		const product = await newProduct.save();

		res.json(product);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Update a product
router.put("/:id", async (req, res) => {
	const { name, description, price, image } = req.body;

	const productFields = {};
	if (name) productFields.name = name;
	if (description) productFields.description = description;
	if (price) productFields.price = price;
	if (image) productFields.image = image;

	try {
		let product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: "Product not found" });
		}

		product = await Product.findByIdAndUpdate(
			req.params.id,
			{ $set: productFields },
			{ new: true }
		);

		res.json(product);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.status(500).send("Server Error");
	}
});

// Delete a product
router.delete("/:id", async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: "Product not found." });
		}

		await Product.findByIdAndRemove(req.params.id);

		res.json({ msg: "Product removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.status(500).send("Server Error");
	}
});

module.exports = router;
