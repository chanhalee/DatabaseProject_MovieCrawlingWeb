import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ActorList from "./ActorList";
import ActorProfileForm from "./ActorProfileForm";

const Actors = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [searchQeury, setSearchQeury] = useState(
		params.search === "all"
			? ""
			: " WHERE a_name like '%" + params.search + "%'"
	);
	const [searchInput, setSearchInput] = useState("");
	const page = parseInt(params.page);
	const [loading, setLoading] = useState(true);
	const [actors, setactors] = useState([]);
	const onChangeSearchInput = (e) => setSearchInput(e.target.value);
	const onClickSearch = () => {
		navigate(
			"/actors/" + (searchInput === "" ? "all" : searchInput) + "/1"
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
				: " WHERE ak_name like '%" + params.search + "%'"
		);
		setactors([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT * FROM actor" +
					searchQeury +
					" order by aid Limit " +
					10 * (params.page - 1) +
					", 10;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((actor) =>
					setactors((prevState) => [
						...prevState,
						{
							aid: actor.aid,
							ak_name: actor.ak_name,
							ae_name: actor.ae_name,
							a_image: actor.a_image,
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
			<h1>전체 영화 조회</h1>
			<div>
				<input
					type="text"
					name="message"
					placeholder="배우 검색"
					value={searchInput}
					onChange={onChangeSearchInput}
					onKeyPress={onKeyPress}
				/>
				<button onClick={onClickSearch}>검색</button>
			</div>
			<ActorList actors={actors} />
			<br></br>
			{page >= 2 ? (
				<Link to={"/actors/" + params.search + "/" + (page - 1)}>
					이전 페이지
				</Link>
			) : (
				"       "
			)}
			{actors.length >= 10 ? (
				<Link to={"/actors/" + params.search + "/" + (page + 1)}>
					다음 페이지
				</Link>
			) : (
				""
			)}
		</div>
	);
};

export default Actors;
