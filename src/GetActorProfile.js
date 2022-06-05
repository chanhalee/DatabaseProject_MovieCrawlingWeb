import React, { useState } from "react";

const GetActorProfile = (getMid) => {
	const [actors, setActor] = useState([{}]);
	fetch("http://localhost:3001/data/actor", {
		method: "post", //통신방법
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			all: false,
			query:
				"SELECT a.aid as aid, a.ak_name as ak_name, a.ae_name as ae_name, a.a_image as a_image, ma.part as part, ma.role as role FROM movie_actor ma join actor a on ma.mid= " +
				getMid +
				" and a.aid=ma.aid;",
		}),
	})
		.then((res) => res.json())
		.then((json) =>
			json.map((actor) =>
				setActor(
					actors.concat({
						aid: actor.aid,
						ak_name: actor.ak_name,
						a_image: actor.a_image,
					})
				)
			)
		);
	return actors;
};

export default GetActorProfile;
