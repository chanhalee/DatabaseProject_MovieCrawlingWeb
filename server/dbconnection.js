const mysql = require("mysql"); // << 새로 추가된 부분

const connection = mysql.createConnection({
	/// 새로 추가된 부분
	host: "localhost",
	user: "chanha", // mysql에 아이디를 넣는다.
	password: "lee", // mysql의 비밀번호를 넣는다.
	port: 3306,
	database: "movie_data", //위에서 만든 데이터베이스의 이름을 넣는다.
});

module.exports = connection;
