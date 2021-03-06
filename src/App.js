import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/Movies";
import Profile from "./pages/Profile";
import ActorProfile from "./pages/ActorProfile";
import Genre from "./pages/Genre";
import DirectorProfile from "./pages/DirectorProfile";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import "./App.css";
import Directors from "./pages/Directors";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route
				path="/actors/:search/:order/:desc/:page"
				element={<Actors />}
			/>
			<Route
				path="/directors/:search/:order/:desc/:page"
				element={<Directors />}
			/>
			<Route
				path="/movies/:search/:order/:desc/:page"
				element={<Movies />}
			/>
			<Route path="/profiles/:mid" element={<Profile />} />
			<Route path="/actorprofiles/:aid" element={<ActorProfile />} />
			<Route
				path="/genre/:gid/:search/:order/:desc/:page"
				element={<Genre />}
			/>
			<Route
				path="/directorprofiles/:did"
				element={<DirectorProfile />}
			/>
		</Routes>
	);
};

export default App;
