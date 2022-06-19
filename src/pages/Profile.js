import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActorProfileForm from "./forms/ActorProfileForm";
import DirectorProfile from "./DirectorProfile";
import DirectorProfileForm from "./forms/DirectorProfileForm";
import Genre from "./Genre";
import GenreForm from "./forms/GenreForm";
import "./Profile.css";
import NavigationBar from "./fragments/NavigationBar";

const Profile = () => {
	const params = useParams();
	const mid = params.mid;
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [scenes, setScenes] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		setMovies([]);
		setReviews([]);
		setScenes([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query: "SELECT * FROM movie WHERE mid = " + mid + ";",
				double: true,
				querySecond:
					"SELECT * FROM movie_review WHERE mid = " + mid + ";",
				triple: true,
				queryThird:
					"SELECT * FROM movie_scene WHERE mid = " + mid + ";",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.first.map((movie) =>
					setMovies({
						mid: movie.mid,
						m_name: movie.m_name,
						m_rate: movie.m_rate,
						m_netizen_score: movie.m_netizen_score,
						m_netizen_count: movie.m_netizen_count,
						m_journalist_score: movie.m_journalist_score,
						m_journalist_count: movie.m_journalist_count,
						m_playing_time: movie.m_playing_time,
						m_opening_date: movie.m_opening_date,
						m_image: movie.m_image,
						m_synopsis: movie.m_synopsis,
					})
				);
				json.second.map((review) =>
					setReviews((prevState) => [
						...prevState,
						{
							rid: review.rid,
							mid: review.mid,
							r_date: review.r_date,
							r_user_name: review.r_user_name,
							r_recommended: review.r_recommended,
							r_title: review.r_title,
							r_contents: review.r_contents,
						},
					])
				);
				json.third.map((scene) =>
					setScenes((prevState) => [
						...prevState,
						{
							mid: scene.mid,
							ms_scene: scene.ms_scene,
						},
					])
				);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<div>
				<NavigationBar />
				<button onClick={() => navigate(-1)}>이전 페이지</button>
				<br></br>
				<h1>영화 상세 프로필</h1>
				<div className="movie">
					<h1>{movies.m_name}</h1>
					<div>
						<img
							src={movies.m_image}
							alt="영화 포스터"
							className="poster"
						></img>
					</div>
					<div className="basicinfo">
						<div>
							장르 {"\t"}: {"\t"}
							<GenreForm mid={mid}></GenreForm>
						</div>
						<br></br>
						<div>
							상영 시간 {"\t"}: {"\t"}
							{movies.m_playing_time} 분
						</div>
						<br></br>
						<div>
							개봉 일자 {"\t"}: {"\t"}
							{moment(movies.m_opening_date).format(
								"YYYY년 MM월 DD일"
							)}
						</div>
						<br></br>
						<div>
							네티즌 평점 {"\t"}: {"\t"}
							{movies.m_netizen_score}, {movies.m_netizen_count}
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
							관람 등급 {"\t"}: {"\t"}
							{movies.m_rate}
						</div>
						<br></br>
					</div>
					<br></br>
					<div className="synopsis">
						<h2>감독:</h2>
						<div>
							<DirectorProfileForm mid={mid} />
						</div>
					</div>
					<div className="synopsis">
						<h2>시놉시스</h2>
						<p>{movies.m_synopsis}</p>
					</div>
					<h2>배우 정보</h2>
					<ActorProfileForm mid={mid} />
					<h2>리뷰</h2>
					{reviews.map((review) => (
						<div className="movieReview">
							<div className="movieReviewTitle">
								{review.r_title}
							</div>
							<br></br>
							<div>
								{"   작성자: " +
									review.r_user_name +
									" |  작성일: " +
									review.r_date.substr(0, 10) +
									" | 추천 " +
									review.r_recommended}
							</div>
							<br></br>
							<br></br>
							<div className="movieReviewContents">
								{review.r_contents
									.split("showReviewDetail")[1]
									.substr(12)
									.replace(/>/g, "")
									.replace(/</g, "")
									.replace(/\//g, "")
									.replace(/fonta/gi, "")
									.replace(/font style/gi, "")
									.replace(/"FONT-FAMILY: /g, "")
									.replace(/=0_0;"/g, "")
									.replace(/^a|a+$/g, "")}
							</div>
							<br></br>
							<br></br>
						</div>
					))}
					<h2>영화 씬</h2>
					{scenes.map((scene) => (
						<div>
							<img
								className="movieSceneImg"
								src={scene.ms_scene}
								alt=""
							></img>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Profile;
