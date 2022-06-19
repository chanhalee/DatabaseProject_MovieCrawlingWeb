function ParseGenre(gid) {
	if (gid === 1) return "드라마";
	if (gid === 2) return "판타지";
	if (gid === 3) return "서부";
	if (gid === 4) return "공포";
	if (gid === 5) return "멜로/로맨스";
	if (gid === 6) return "모험";
	if (gid === 7) return "스릴러";
	if (gid === 8) return "느와르";
	if (gid === 9) return "컬트";
	if (gid === 10) return "다큐멘터리";
	if (gid === 11) return "코미디";
	if (gid === 12) return "가족";
	if (gid === 13) return "미스터리";
	if (gid === 14) return "전쟁";
	if (gid === 15) return "애니메이션";
	if (gid === 16) return "범죄";
	if (gid === 17) return "뮤지컬";
	if (gid === 18) return "SF";
	if (gid === 19) return "액션";
	if (gid === 20) return "무협";
	if (gid === 21) return "에로";
	if (gid === 22) return "서스펜스";
	if (gid === 23) return "서사";
	if (gid === 24) return "블랙코미디";
	if (gid === 25) return "실험";
	return "NoCat";
}

export default ParseGenre;
