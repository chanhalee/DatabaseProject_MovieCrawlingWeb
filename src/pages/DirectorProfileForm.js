import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Director({ director }) {
	return (
		<div
			style={{
				cursor: "pointer",
				//color: movie.active ? 'green' : 'black'
			}}
			className="directors"
		>
			<img className="directorimage" src={director.d_image} alt="d"></img>
			<br></br>
			<Link to={"/directorprofiles/" + director.did}>
				<b>{director.dk_name}</b>
			</Link>
			<br></br>
			&nbsp;
			{/* <span>({director.role})</span> */}
		</div>
	);
}

function DirectorProfileForm({ mid }) {
	const [loading, setLoading] = useState(true);
	const [directors, setDirectors] = useState([]);
	useEffect(() => {
		setDirectors([]);
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				all: false,
				query:
					"SELECT * FROM movie_director md join director d on md.mid= " +
					mid +
					" and d.did=md.did;",
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((director) =>
					setDirectors((prevState) => [
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
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<div>감독:</div>
			<div>
				{directors.map((director) => (
					<Director director={director} key={director.did} />
				))}
			</div>
		</div>
	);
}

export default DirectorProfileForm;
