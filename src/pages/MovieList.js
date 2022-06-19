import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import DirectorProfileForm from "./forms/DirectorProfileForm";
import GenreForm from "./forms/GenreForm";
import "./MovieList.css";

function MovieL({ movie }) {
	return (
		<div className="movieList">
			<div className="movieInfo">
				<div>
					<img
						src={movie.m_image}
						alt=""
						className="entryMovieImage"
					></img>
				</div>
				<div className="movieBasicInfo">
					<Link to={"/profiles/" + movie.mid} className="mtitle">
						{movie.m_name}
					</Link>
					<br></br>
					<div>
						장르 {"\t"}: {"\t"}
						<GenreForm mid={movie.mid}></GenreForm>
					</div>
					<br></br>
					<div>
						상영 시간 {"\t"}: {"\t"}
						{movie.m_playing_time} 분
					</div>
					<br></br>
					<div>
						개봉 일자 {"\t"}: {"\t"}
						{moment(movie.m_opening_date).format(
							"YYYY년 MM월 DD일"
						)}
					</div>
					<br></br>
					<div>
						네티즌 평점 {"\t"}: {"\t"}
						{movie.m_netizen_score}, {movie.m_netizen_count}
						{"명 참여"}
					</div>
					<br></br>
					<div>
						평론가 평점 {"\t"}: {"\t"}
						{movie.m_journalist_score}, {movie.m_journalist_count}
						{"명 참여"}
					</div>
					<br></br>
					<div>({movie.m_rate})</div>
					<br></br>
					<div>
						감독 :
						<DirectorProfileForm mid={movie.mid} noPic={true} />
					</div>
				</div>
			</div>
			<div>
				<div className="synopsis">
					<h2>시놉시스</h2>
					<p>{movie.m_synopsis}</p>
				</div>
			</div>
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
