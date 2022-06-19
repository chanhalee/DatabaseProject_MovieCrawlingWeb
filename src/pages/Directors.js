import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DirectorList from "./DirectorList";
import DirectorProfileForm from "./forms/DirectorProfileForm";
import NavigationBar from "./fragments/NavigationBar";

const Directors = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchQeury, setSearchQeury] = useState(
		params.search === "all"
			? ""
			: " and dk_name like '%" + params.search + "%'"
	);
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [desc, setDesc] = useState(true);
	const [directors, setdirectors] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/directors/" +
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
				? " "
				: " and dk_name like '%" + params.search + "%'"
		);
		setdirectors([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT * FROM director WHERE dk_name <> ''" +
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
				json.map((director) =>
					setdirectors((prevState) => [
						...prevState,
						{
							did: director.did,
							dk_name: director.dk_name,
							de_name: director.de_name,
							d_image: director.d_image,
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
			<h1>전체 감독 조회</h1>
			<Link
				to={
					"/directors/" +
					params.search +
					"/" +
					"did" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button className="pageBtn">
					{"기본 " +
						(params.order === "did"
							? params.desc === "desc"
								? " ↓"
								: " ↑"
							: "")}
				</button>
			</Link>
			<Link
				to={
					"/directors/" +
					params.search +
					"/" +
					"dk_name" +
					"/" +
					(params.desc === "desc" ? " /1" : "desc/1")
				}
			>
				<button className="pageBtn">
					{"이름 " +
						(params.order === "dk_name"
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
					placeholder="감독 검색"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>검색</button>
			</div>
			<br></br>
			<DirectorList directors={directors} />
			<br></br>
			{page >= 2 ? (
				<Link
					to={
						"/directors/" +
							params.search +
							"/" +
							params.order +
							"/" +
							params.desc ===
						"desc"
							? " "
							: "desc" + "/" + (page - 1)
					}
				>
					<button>이전 페이지</button>
				</Link>
			) : (
				"       "
			)}
			{directors.length >= 10 ? (
				<Link
					to={
						"/directors/" +
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

export default Directors;
