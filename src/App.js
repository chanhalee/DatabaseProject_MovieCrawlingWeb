import "./App.css";
import Example3 from "./Example3";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />\
			<Route path="/profiles/:mid" element={<Profile />} />
		</Routes>
	);
};

export default App;
