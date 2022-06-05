import React, { useState } from "react";

const GetMovieProfile = (getMid) => {
	const [movies, setMovie] = useState({});
	fetch("http://localhost:3001/data/movie", {
		method: "post", //통신방법
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			all: false,
			query: "SELECT * FROM movie WHERE mid = " + getMid + ";",
		}),
	})
		.then((res) => res.json())
		.then((json) =>
			json.map((movie) =>
				setMovie({
					mid: movie.mid,
					m_name: movie.m_name,
				})
			)
		);
	return movies;
};

export default GetMovieProfile;
