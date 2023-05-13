import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Product from "./Product/Product";

const ProductList = () => {
	const { data: products, isLoading, error, fetchData } = useFetch();

	useEffect(() => {
		fetchData("/api/products");
	}, [fetchData]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred: {error.message}</div>;
	}

	return (
		<div>
			<h1>Products</h1>
			{products.map(product => (
				<Product
					key={product.id}
					product={product}
				/>
			))}
		</div>
	);
};

export default ProductList;
