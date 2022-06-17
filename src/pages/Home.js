import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>영화 검색 홈</h1>
			<p>힘들다</p>
			<Link to="/movies/all/1">영화 검색</Link>
			<span> </span>
			<Link to="/actors/all/1">배우 검색</Link>
		</div>
	);
};
export default Home;
