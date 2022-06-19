import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./fragments/NavigationBar";
import MovieList from "./MovieList";
import "./Genre.css";
import ParseGenre from "./util/ParseGenre";

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
				: " and m_name like '%" + params.search + "%'"
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
					" order by m." +
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
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<NavigationBar />
			<h1>{"장르별 영화 조회: " + ParseGenre(parseInt(params.gid))}</h1>
			<Link
				to={"/genre/1/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "1"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					드라마
				</button>
			</Link>
			<Link
				to={"/genre/2/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "2"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					판타지
				</button>
			</Link>
			<Link
				to={"/genre/3/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "3"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					서부
				</button>
			</Link>
			<Link
				to={"/genre/4/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "4"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					공포
				</button>
			</Link>
			<Link
				to={"/genre/5/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "5"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					멜로/로멘스
				</button>
			</Link>
			<Link
				to={"/genre/6/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "6"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					모험
				</button>
			</Link>
			<Link
				to={"/genre/7/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "7"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					스릴러
				</button>
			</Link>
			<Link
				to={"/genre/8/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "8"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					느와르
				</button>
			</Link>
			<Link
				to={"/genre/9/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "9"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					컬트
				</button>
			</Link>
			<Link
				to={"/genre/10/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "10"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					다큐멘터리
				</button>
			</Link>
			<Link
				to={"/genre/11/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "11"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					코미디
				</button>
			</Link>
			<Link
				to={"/genre/12/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "12"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					가족
				</button>
			</Link>
			<Link
				to={"/genre/13/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "13"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					미스터리
				</button>
			</Link>
			<Link
				to={"/genre/14/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "14"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					전쟁
				</button>
			</Link>
			<Link
				to={"/genre/15/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "15"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					애니메이션
				</button>
			</Link>
			<Link
				to={"/genre/16/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "16"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					범죄
				</button>
			</Link>
			<Link
				to={"/genre/17/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "17"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					뮤지컬
				</button>
			</Link>
			<Link
				to={"/genre/18/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "18"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					SF
				</button>
			</Link>
			<Link
				to={"/genre/19/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "19"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					액션
				</button>
			</Link>
			<Link
				to={"/genre/20/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "20"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					무협
				</button>
			</Link>
			<Link
				to={"/genre/21/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "21"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					애로
				</button>
			</Link>
			<Link
				to={"/genre/22/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "22"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					서스펜스
				</button>
			</Link>
			<Link
				to={"/genre/23/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "23"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					서사
				</button>
			</Link>
			<Link
				to={"/genre/24/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "24"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					블랙코미디
				</button>
			</Link>
			<Link
				to={"/genre/25/all/" + params.order + "/" + params.desc + "/1"}
			>
				<button
					className={
						params.gid === "25"
							? "selectedGenreBtn"
							: "unselectedGenreBtn"
					}
				>
					실험
				</button>
			</Link>
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
			<br></br>
			<Link
				to={
					"/genre/" +
					params.gid +
					"/" +
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
					"/genre/" +
					params.gid +
					"/" +
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
					{"이름 " +
						(params.order === "m_name"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/genre/" +
					params.gid +
					"/" +
					params.search +
					"/m_netizen_score/" +
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
					"/genre/" +
					params.gid +
					"/" +
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
						params.order +
						"/" +
						params.desc +
						"/" +
						(page - 1)
					}
				>
					<button>이전 페이지</button>
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

export default Genre;
