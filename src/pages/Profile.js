import { useState } from "react";
import { useParams } from "react-router-dom";
import ActorProfileForm from "../ActorProfileForm";
import GetActorProfile from "../GetActorProfile";
import GetMovieProfile from "../GetMovieProfile";

const Profile = () => {
	const [actorClick, setActorClick] = useState(false);
	const [actors, setActors] = useState([{}]);
	const [movie, setMovie] = useState({});
	const [querybody, setQuerybody] = useState({});
	const params = useParams();
	const mid = params.mid;
	const onClickActor = () => {};
	const actorButton = () => {
		setQuerybody({
			all: false,
			query:
				"SELECT a.aid as aid, a.ak_name as ak_name, a.ae_name as ae_name, a.a_image as a_image, ma.part as part, ma.role as role FROM movie_actor ma join actor a on ma.mid= " +
				mid +
				" and a.aid=ma.aid;",
		});
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(querybody),
		})
			.then((res) => res.json())
			.then((json) =>
				json.map((actor) =>
					setActors(
						actors.concat({
							aid: actor.aid,
							ak_name: actor.ak_name,
							a_image: actor.a_image,
						})
					)
				)
			);
	};

	return (
		<div>
			<h1
				onClick={() => {
					console.log(movie);
					setMovie(GetMovieProfile(mid));
				}}
			>
				사용자 프로필
			</h1>
			<div>
				<button onClick={actorButton()}>배우 정보</button>
				{actorClick ? (
					<div></div>
				) : (
					<ActorProfileForm
						actors={actors}
						onClickA={onClickActor}
					></ActorProfileForm>
				)}
			</div>
		</div>
	);
};
export default Profile;
