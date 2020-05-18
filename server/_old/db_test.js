const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db1.sqlite', err => {
	if (err) {
		console.error(err.message);
	}
	console.log('Conectado a la DB');
});

let sql = `SELECT DISTINCT QA Question  , User User  , _rowid_ id
            FROM Questions
            WHERE Estado = 0
            ORDER BY _rowid_ `;
db.get(sql, [], (err, row) => {
	if (err) {
		throw err;
	}
	if (row != undefined) {
		console.log(`${row.User} pregunto: ${row.Question} `);
		let sql2 = `UPDATE Questions
SET Estado = 1
WHERE _rowid_ = ${row.id};`;
		db.all(sql2, []);
	} else {
		console.log("No hay mas preguntas para responder ameo'");
	}
});

const sql2 = `SELECT DISTINCT QA Question  , User User  , _rowid_ id
            FROM Questions
            WHERE Estado = 1
			ORDER BY _rowid_ `;

db.all(sql2, [], (err, rows) => {
	if (err) {
		throw err;
	}
	rows.forEach(row => {
		// eslint-disable-next-line prettier/prettier
		console.log(`${row.User} pregunto (en un pasado muy muy lejano): ${row.Question} `);
	});
});
