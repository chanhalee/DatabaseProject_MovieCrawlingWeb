import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
	return (
		<div className="navigationBar">
			<div>
				<Link to="/home" className="nav_HomeBtn">
					홈으로
				</Link>
			</div>
			<div>
				<Link to="/movies/all/mid/ /1" className="nav_MovieBtn">
					영화 검색
				</Link>
			</div>
			<div>
				<Link to="/actors/all/aid/desc/1" className="nav_ActorBtn">
					배우 검색
				</Link>
			</div>
			<div>
				<Link
					to="/directors/all/did/desc/1"
					className="nav_DirectorBtn"
				>
					감독 검색
				</Link>
			</div>
			<div>
				<Link to="/genre/1/all/mid/desc/1" className="nav_GenreBtn">
					영화 장르별 검색
				</Link>
			</div>
		</div>
	);
}

export default NavigationBar;
