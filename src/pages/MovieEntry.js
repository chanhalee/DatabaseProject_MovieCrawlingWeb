import React from "react";
import { Link } from "react-router-dom";
import "./MovieEntry.css";

function MovieE({ movie }) {
	return (
		<div className="movieEntry">
			<img src={movie.m_image} alt="" className="entryMovieImage"></img>
			<br></br>
			<Link to={"/profiles/" + movie.mid} className="mtitle">
				{movie.m_name}
			</Link>
			&nbsp;
			<br></br>
			{movie.part || movie.role ? (
				<div>
					<div style={{ color: "red", fontWeight: "bold" }}>
						{movie.part + "    "}
					</div>
					<div>
						{" "}
						{movie.role === "" ? "" : " |  " + movie.role + "역"}
					</div>
					<br></br>
				</div>
			) : (
				""
			)}
			<span>({movie.m_rate})</span>
		</div>
	);
}

function MovieEntry({ movies }) {
	return (
		<div>
			{movies.map((movie) => (
				<MovieE movie={movie} key={movie.mid} />
			))}
		</div>
	);
}

export default MovieEntry;
