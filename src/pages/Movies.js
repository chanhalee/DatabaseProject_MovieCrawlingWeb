import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import MovieList from "./MovieList";
import "./Movies.css";

const Movies = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchQeury, setSearchQeury] = useState(
		params.search === "all"
			? ""
			: " WHERE m_name like '%" + params.search + "%'"
	);
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/movies/" +
				(searchInput === "" ? "all" : searchInput) +
				"/" +
				params.order +
				"/" +
				params.desc +
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
					"SELECT * FROM movie" +
					searchQeury +
					" order by " +
					params.order +
					" " +
					params.desc +
					" Limit " +
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
							m_netizen_score: movie.m_netizen_score,
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
	if (loading) return <div>새로고침 하세요</div>;
	return (
		<div>
			<NavigationBar />
			<h1>전체 영화 조회</h1>
			<br></br>
			<h2>
				{"정렬: " +
					(params.order === "m_opening_date"
						? params.desc === "desc"
							? "개봉일 내림차순"
							: "개봉일 오름차순"
						: params.order === "m_netizen_score"
						? params.desc === "desc"
							? "네티즌 평점 내림차순"
							: "네티즌 평점 오름차순"
						: params.order === "m_name"
						? params.desc === "desc"
							? "이름 내림차순"
							: "이름 오름차순"
						: params.order === "mid"
						? params.desc === "desc"
							? "기본 내림차순"
							: "기본 오름차순"
						: "")}
			</h2>
			<Link
				to={
					"/movies/" +
					params.search +
					"/" +
					"mid" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "mid"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"기본 " +
						(params.order === "mid"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/movies/" +
					params.search +
					"/" +
					"m_name" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "m_name"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"이름 \n" +
						(params.order === "m_name"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/movies/" +
					params.search +
					"/" +
					"m_netizen_score" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "m_netizen_score"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"네티즌 평점 " +
						(params.order === "m_netizen_score"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/movies/" +
					params.search +
					"/" +
					"m_opening_date" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button
					className={
						params.order === "m_opening_date"
							? "selectedOrderBtn"
							: "unselectedOrderBtn"
					}
				>
					{"개봉일 " +
						(params.order === "m_opening_date"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<div>
				<input
					type="text"
					name="message"
					placeholder="영화 검색"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>검색</button>
			</div>
			<br></br>
			<MovieList movies={movies} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/movies/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc +
						"/" +
						(page - 1)
					}
				>
					<button className="pageBtn">이전 페이지</button>
				</Link>
			) : (
				"       "
			)}
			{movies.length >= 10 ? (
				<Link
					to={
						"/movies/" +
						params.search +
						"/" +
						params.order +
						"/" +
						params.desc +
						"/" +
						(page + 1)
					}
				>
					<button>다음 페이지</button>
				</Link>
			) : (
				""
			)}
		</div>
	);
};

export default Movies;
