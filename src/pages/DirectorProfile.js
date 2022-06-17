import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieEntry from "./MovieEntry";
import "./DirectorProfile.css";

const DirectorProfile = () => {
	const params = useParams();
	const did = params.did;
	const [loading, setLoading] = useState(true);
	const [director, setdirector] = useState([]);
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
				query:
					"SELECT * FROM (SELECT m.*, md.did FROM movie_director md join movie m on md.did= " +
					did +
					" and m.mid=md.mid) a join director d on d.did = a.did;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((movie) => {
					setMovies((prevState) => [
						...prevState,
						{
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
						},
					]);
					setdirector({
						dk_name: movie.dk_name,
						de_name: movie.de_name,
						d_image: movie.d_image,
					});
				});

				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div className="directorProfile">
			<Link to="/home">홈으로</Link>
			<button onClick={() => navigate(-1)}>이전 페이지</button>
			<br></br>
			<div className="directorInfo">
				<img src={director.d_image} alt="감독 사진"></img>
				<b>{director.dk_name} </b>
				<div>
					{director.de_name === ""
						? ""
						: " ( " + director.de_name + ")"}
				</div>
				<br></br>
			</div>
			<br></br>

			<div>
				<h1>제작 영화</h1>
				<MovieEntry movies={movies} />
			</div>
		</div>
	);
};

export default DirectorProfile;
