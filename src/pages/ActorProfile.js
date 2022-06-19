import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieEntry from "./forms/entries/MovieEntry";
import "./ActorProfile.css";
import NavigationBar from "./fragments/NavigationBar";

const ActorProfile = () => {
	const params = useParams();
	const aid = params.aid;
	const [loading, setLoading] = useState(true);
	const [actor, setActor] = useState([]);
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
					"SELECT k.*, a.ak_name, a.ae_name, a.a_image FROM (SELECT m.*, ma.role, ma.part, ma.aid FROM movie_actor ma join movie m on ma.aid= " +
					aid +
					" and m.mid=ma.mid) as k join actor a on k.aid = a.aid ;",
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
							m_netizen_score: movie.m_netizen_score,
							m_netizen_count: movie.m_netizen_count,
							m_journalist_score: movie.m_journalist_score,
							m_journalist_count: movie.m_journalist_count,
							m_playing_time: movie.m_playing_time,
							m_opening_date: movie.m_opening_date,
							m_image: movie.m_image,
							m_synopsis: movie.m_synopsis,
							role: movie.role,
							part: movie.part,
						},
					]);
					setActor({
						ak_name: movie.ak_name,
						ae_name: movie.ae_name,
						a_image: movie.a_image,
					});
				});

				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div className="actorProfile">
			<NavigationBar />
			<button onClick={() => navigate(-1)}>이전 페이지</button>
			<br></br>
			<div className="actorInfo">
				<img src={actor.a_image} alt="배우 사진"></img>
				<b>{actor.ak_name} </b>
				<div> ({actor.ae_name})</div>
				<br></br>
			</div>
			<br></br>

			<div>
				<h1>출연 영화</h1>
				<MovieEntry movies={movies} />
			</div>
		</div>
	);
};

export default ActorProfile;
