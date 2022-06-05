import React from "react";
import { Link } from "react-router-dom";

function Actor({ actor, onClickA }) {
	return (
		<div>
			<Link to={"/actorprofiles/" + actor.aid}>{actor.a_name}</Link>
			<b
				style={{
					cursor: "pointer",
					//color: movie.active ? 'green' : 'black'
				}}
				onClick={() => onClickA(actor.aid)}
			>
				<img src={actor.a_image} alt=""></img>
				{actor.a_name}
			</b>
			&nbsp;
			<span>({actor.role})</span>
		</div>
	);
}

function ActorProfileForm({ actors, onClickA }) {
	return (
		<div>
			{actors.map((actor) => (
				<Actor actor={actor} key={actor.aid} onClickM={onClickA} />
			))}
		</div>
	);
}

export default ActorProfileForm;
