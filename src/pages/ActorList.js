import React from "react";
import { Link } from "react-router-dom";
import "./ActorList.css";

function ActorL({ actor }) {
	return (
		<div className="actorList">
			<img src={actor.a_image} alt="" className="entryactorImage"></img>
			<br></br>
			<Link to={"/actorprofiles/" + actor.aid} className="atitle">
				{actor.ak_name}
			</Link>
			&nbsp;
			<span>({actor.ae_name})</span>
		</div>
	);
}

function ActorList({ actors }) {
	return (
		<div>
			{actors.map((actor) => (
				<ActorL actor={actor} key={actor.aid} />
			))}
		</div>
	);
}

export default ActorList;
