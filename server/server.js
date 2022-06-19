const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require("./connection");
const { useInsertionEffect } = require("react");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/data", (req, res) => {
	console.log(req.body);
	if (req.body.all) {
		db.query("SELECT * FROM movie", async function (err, rows, fields) {
			if (err) {
				console.log("데이터 가져오기 실패");
			} else {
				console.log(rows);
				await res.send(rows);
			}
		});
	} else {
		db.query(req.body.query, async function (err, rows, fields) {
			if (err) {
				console.log("데이터 가져오기 실패");
			} else {
				console.log(rows);
				if (req.body.double) {
					await db.query(
						req.body.querySecond,
						async function (errt, rowst, fieldst) {
							if (errt) {
								console.log("데이터 가져오기 실패");
								await res.send(rows);
							} else {
								if (req.body.triple) {
									await db.query(
										req.body.queryThird,
										async function (
											errtt,
											rowstt,
											fieldstt
										) {
											if (errtt) {
												console.log(
													"데이터 가져오기 실패"
												);
												await res.send({
													first: rows,
													second: rowst,
												});
											} else {
												await res.send({
													first: rows,
													second: rowst,
													third: rowstt,
												});
											}
										}
									);
								} else {
									console.log(rowst);
									await res.send({
										first: rows,
										second: rowst,
									});
								}
							}
						}
					);
				} else {
					await res.send(rows);
				}
			}
		});
	}
});
