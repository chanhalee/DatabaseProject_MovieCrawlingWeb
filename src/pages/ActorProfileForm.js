import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ActorProfileForm.css";
function Actor({ actor }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="actors"
		>
			<img className="actorimage" src={actor.a_image} alt="d"></img>
			<br></br>
			<Link to={"/actorprofiles/" + actor.aid}>
				<b>{actor.ak_name}</b>
			</Link>
			<br></br>
			<div style={{ color: "red", fontWeight: "bold" }}>
				{actor.part + "    "}
			</div>
			<div> {actor.role === "" ? "" : " |  " + actor.role + "역"}</div>
			<br></br>
			&nbsp;
			{/* <span>({actor.role})</span> */}
		</div>
	);
}

function ActorProfileForm({ mid }) {
	const [loading, setLoading] = useState(true);
	const [actors, setActors] = useState([]);
	useEffect(() => {
		setActors([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT a.aid as aid, a.ak_name as ak_name, a.ae_name as ae_name, a.a_image as a_image, ma.part as part, ma.role as role FROM movie_actor ma join actor a on ma.mid= " +
					mid +
					" and a.aid=ma.aid;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((actor) =>
					setActors((prevState) => [
						...prevState,
						{
							aid: actor.aid,
							ak_name: actor.ak_name,
							ae_name: actor.ae_name,
							a_image: actor.a_image,
							role: actor.role,
							part: actor.part,
						},
					])
				);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			{actors.map((actor) => (
				<Actor actor={actor} key={actor.aid} />
			))}
		</div>
	);
}

export default ActorProfileForm;
