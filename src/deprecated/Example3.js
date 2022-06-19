import { wait } from "@testing-library/user-event/dist/utils";
import React, { Component, useRef } from "react";
import "./pages/forms/entries/MovieEntry.css";
import MovieList from "../pages/MovieList";

class Example3 extends Component {
	state = {
		movies: [],
		movieEntry: "",
		querybody: {
			all: false,
			qeury: "all",
		},
		searchMovieName: "",
	};

	onClickGetAll = () => {
		const nextQueryBody = {
			...this.state.querybody,
			all: true,
		};
		this.setState({ querybody: nextQueryBody });
		this.setState({ movies: [] });
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(this.state.querybody),
		})
			.then((res) => res.json())
			.then((json) => {
				json.map((movie) =>
					this.setState((prevState) => ({
						movies: [
							...prevState.movies,
							{
								mid: movie.mid,
								m_name: movie.m_name,
								m_rate: movie.m_rate,
								m_netizen_rate: movie.m_netizen_rate,
								m_netizen_count: movie.m_netizen_count,
								m_journalist_score: movie.m_journalist_score,
								m_journalist_count: movie.m_journalist_count,
								m_playing_time: movie.m_playing_time,
								m_opening_date: movie.m_opening_date,
								m_image: movie.m_image,
								m_synopsis: movie.m_synopsis,
							},
						],
					}))
				);
			});
	};
	onClickM = (e) => {};
	handleChangeSearch = (e) => {
		this.setState({ searchMovieName: e.target.value });
		console.log(this.state.searchMovieName.concat("."));
	};
	onClickSearch = (e) => {
		const nextQueryBody = {
			all: false,
			query:
				"SELECT * FROM movie WHERE m_name like '%" +
				this.state.searchMovieName +
				"%';",
		};
		this.setState({ querybody: nextQueryBody });
		this.setState({ movies: [] });
		fetch("http://localhost:3001/data", {
			method: "post", //통신방법
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(this.state.querybody),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				json.map(
					(movie) =>
						this.setState((prevState) => ({
							movies: [
								...prevState.movies,
								{
									mid: movie.mid,
									m_name: movie.m_name,
									m_rate: movie.m_rate,
									m_netizen_rate: movie.m_netizen_rate,
									m_netizen_count: movie.m_netizen_count,
									m_journalist_score:
										movie.m_journalist_score,
									m_journalist_count:
										movie.m_journalist_count,
									m_playing_time: movie.m_playing_time,
									m_opening_date: movie.m_opening_date,
									m_image: movie.m_image,
									m_synopsis: movie.m_synopsis,
								},
							],
						})),
					console.log(this.state.movies)
				);
			});
	};
	onKeyPressSearch = (e) => {
		if (e.key === "Enter") {
			this.onClickSearch(e);
		}
	};
	// mvList = this.state.movies.map((movie) => (
	// 	<li className={"movieEntry"} key={movie.id}>
	// 		<div className="movie_info">
	// 			<h1 className="movie_title">영화 제목 {movie.title}</h1>
	// 			<div className="movie_thumb">
	// 				<img src={movie.image} alt=""></img>
	// 			</div>
	// 			<div className="movie_star">
	// 				<div className="netizen_star">
	// 					네티즌 평점: {movie.netizen_rate}
	// 				</div>
	// 				참여 <em>{movie.netizen_count}</em>명
	// 				<div className="journalist_star">
	// 					기자/평론가 평점: {movie.journalist_rate}
	// 				</div>
	// 				참여 <em>{movie.journalist_count}</em>명
	// 			</div>
	// 			<div className="movie_scope">{movie.scope}</div>
	// 			<div className="movie_playtime">{movie.playing_time}</div>
	// 			<div className="movie_opening_date">{movie.opening_date}</div>
	// 			<div className="movie_director">{movie.director}</div>
	// 		</div>
	// 	</li>
	// ));
	render() {
		return (
			<div>
				<h1>데이터 가져오기</h1>
				<button onClick={this.onClickGetAll}>가져오기</button>
				<br></br>
				<input
					type="text"
					name="movieName"
					placeholder="영화제목"
					value={this.state.searchMovieName}
					onChange={this.handleChangeSearch}
					onKeyPress={this.onKeyPressSearch}
				/>
				<button onClick={this.onClickSearch}>검색</button>
				<br></br>
				<div>
					<h1>{this.state.movies.length}</h1>
					<br></br>
					<MovieList movies={this.state.movies} />
				</div>
			</div>
		);
	}
}

export default Example3;
