import { Link } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import "./Home.css";

const Home = () => {
	return (
		<div className="home">
			<NavigationBar />
			<h1>201811097 이찬하</h1>
			<h1>데이터베이스(3184)수업 기말 과제</h1>
			<p>
				<b>백엔드: </b> MySQL을 이용한 데이터베이스<br></br>
				<b>웹 크롤링: </b> 파이썬 selenium<br></br>
				<b>프론트 엔드: </b> React를 사용한 웹 페이지<br></br>
			</p>
		</div>
	);
};
export default Home;
