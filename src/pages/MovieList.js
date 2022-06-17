import React from "react";
import { Link } from "react-router-dom";
import "./MovieEntry.css";

function MovieL({ movie }) {
	return (
		<div className="movieList">
			<img src={movie.m_image} alt="" className="entryMovieImage"></img>
			<br></br>
			<Link to={"/profiles/" + movie.mid} className="mtitle">
				{movie.m_name}
			</Link>
			&nbsp;
			<span>({movie.m_rate})</span>
		</div>
	);
}

function MovieList({ movies }) {
	return (
		<div>
			{movies.map((movie) => (
				<MovieL movie={movie} key={movie.mid} />
			))}
		</div>
	);
}

export default MovieList;
