import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MovieList from "./MovieList";

const Genre = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchQeury, setSearchQeury] = useState(
		params.search === "all"
			? " "
			: " and m_name like '%" + params.search + "%'"
	);
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/genre/" +
				params.gid +
				"/" +
				(searchInput === "" ? "all" : searchInput) +
				"/1"
		);
	};
	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onClickSearch();
		}
	};
	useEffect(() => {
		setSearchQeury(
			params.search === "all"
				? ""
				: " WHERE m_name like '%" + params.search + "%'"
		);
		setMovies([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT * FROM movie m join movie_genre g on m.mid=g.mid WHERE g.gid=" +
					params.gid +
					searchQeury +
					" order by m.mid Limit " +
					10 * (params.page - 1) +
					", 10;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((movie) =>
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
					])
				);
				setLoading(false);
			});
	}, [params]);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<Link to="/home">홈으로</Link>
			<button onClick={() => navigate(-1)}>이전 페이지</button>
			<br></br>
			<h1>장르별 영화 조회</h1>
			<div>
				<input
					type="text"
					name="message"
					placeholder="영화 검색"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>장르 내 검색</button>
			</div>
			<br></br>
			<MovieList movies={movies} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/genre/" +
						params.gid +
						"/" +
						params.search +
						"/" +
						(page - 1)
					}
				>
					이전 페이지
				</Link>
			) : (
				"       "
			)}
			{movies.length >= 10 ? (
				<Link
					to={
						"/genre/" +
						params.gid +
						"/" +
						params.search +
						"/" +
						(page + 1)
					}
				>
					다음 페이지
				</Link>
			) : (
				""
			)}
		</div>
	);
};

export default Genre;
