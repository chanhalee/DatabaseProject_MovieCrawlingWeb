import React from "react";
import { Link } from "react-router-dom";
import "./DirectorList.css";

function DirectorL({ director }) {
	return (
		<div className="directorList">
			<img
				src={director.d_image}
				alt=""
				className="entrydirectorImage"
			></img>
			<br></br>
			<Link to={"/directorprofiles/" + director.did} className="atitle">
				{director.dk_name}
			</Link>
			&nbsp;
			<span>({director.de_name})</span>
		</div>
	);
}

function DirectorList({ directors }) {
	return (
		<div>
			{directors.map((director) => (
				<DirectorL director={director} key={director.did} />
			))}
		</div>
	);
}

export default DirectorList;
