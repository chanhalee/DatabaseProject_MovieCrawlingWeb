import React from "react";
import { Link } from "react-router-dom";

function Movie({ movie, onClickM }) {
	return (
		<div>
			<Link to={"/profiles/" + movie.mid}>{movie.m_name}</Link>
			<b
				style={{
					cursor: "pointer",
					//color: movie.active ? 'green' : 'black'
				}}
				onClick={() => onClickM(movie.mid)}
			>
				<img src={movie.m_image} alt=""></img>
				{movie.m_name}
			</b>
			&nbsp;
			<span>({movie.m_rate})</span>
		</div>
	);
}

function MovieList({ movies, onClickM }) {
	return (
		<div>
			{movies.map((movie) => (
				<Movie movie={movie} key={movie.mid} onClickM={onClickM} />
			))}
		</div>
	);
}

export default MovieList;
