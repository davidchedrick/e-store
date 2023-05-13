import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route
						path="/"
						exact
						component={ProductList}
					/>
					<Route
						path="/product/:id"
						component={ProductDetail}
					/>
					<Route
						path="/cart"
						component={Cart}
					/>
					<Route
						path="/checkout"
						component={Checkout}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
