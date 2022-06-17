import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActorProfileForm from "./ActorProfileForm";
import DirectorProfile from "./DirectorProfile";
import DirectorProfileForm from "./DirectorProfileForm";
import "./Profile.css";

const Profile = () => {
	const params = useParams();
	const mid = params.mid;
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		setMovies([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query: "SELECT * FROM movie WHERE mid = " + mid + ";",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((movie) =>
					setMovies({
						mid: movie.mid,
						m_name: movie.m_name,
						m_rate: movie.m_rate,
						m_netizen_rate: movie.m_netizen_rate,
						m_netizen_count: movie.m_netizen_count,
						m_journalist_score: movie.m_journalist_score,
						m_journalist_count: movie.m_journalist_count,
						m_playing_time: movie.m_playing_time,
						m_opening_date: movie.m_opening_date,
						m_image: movie.m_image,
						m_synopsis: movie.m_synopsis,
					})
				);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<div>
				<Link to="/home">홈으로</Link>
				<button onClick={() => navigate(-1)}>이전 페이지</button>
				<br></br>
				<h1>영화 상세 프로필</h1>
				<div className="movie">
					<h1>{movies.m_name}</h1>
					<img
						src={movies.m_image}
						alt="영화 포스터"
						className="poster"
					></img>
					<br></br>
					<div className="basicinfo">
						<div>
							관람 등급 {"\t"}: {"\t"}
							{movies.m_rate}
						</div>
						<br></br>
						<div>
							상영 시간 {"\t"}: {"\t"}
							{movies.m_playing_time} 분
						</div>
						<br></br>
						<div>
							네티즌 평점 {"\t"}: {"\t"}
							{movies.m_netizen_rate}, {movies.m_netizen_count}
							{"명 참여"}
						</div>
						<br></br>
						<div>
							평론가 평점 {"\t"}: {"\t"}
							{movies.m_journalist_score},{" "}
							{movies.m_journalist_count}
							{"명 참여"}
						</div>
						<br></br>
						<div>
							개봉 일자 {"\t"}: {"\t"}
							{moment(movies.m_opening_date).format(
								"YYYY년 MM월 DD일"
							)}
						</div>
						<br></br>
						<DirectorProfileForm mid={mid} />
					</div>
					<div className="synopsis">
						<h2>시놉시스</h2>
						<p>{movies.m_synopsis}</p>
					</div>
					<h2>배우 정보</h2>
					<ActorProfileForm mid={mid} />
				</div>
			</div>
		</div>
	);
};
export default Profile;
