import "./App.css";
import React from "react";
import Example3 from "./Example3";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div>
				<Example3 />
			</div>
		);
	}
}

export default App;
