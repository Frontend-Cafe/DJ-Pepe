const sqlite3 = require('sqlite3').verbose();
module.exports = {
	name: 'question',
	description: 'Modulo para ayudar en las charlas QA',
	execute(message) {
		// Codigo para mover la DB:
		const db = new sqlite3.Database('./db1.sqlite', err => {
			if (err) {
				console.error(err.message);
			}
			console.log('Conectado a la DB');
		});

		const args = message.content.split(' ');

		// eslint-disable-next-line no-undef
		if (args[1] == 'shift') {
			// codigo para sacar *una* pregunta de la db y pasarla al historial:
			// eslint-disable-next-line prettier/prettier
			const sql =
				'SELECT DISTINCT User User , QA Question , _rowid_ id FROM Questions WHERE Estado = 0 ORDER BY _rowid_ ';
			db.get(sql, [], (err, row) => {
				if (err) throw err;

				if (row != undefined) {
					console.log(`${row.User} pregunto: ${row.Question} `);
					message.channel.send(
						`${row.User} pregunto: ${row.Question} `
					);
					const sql2 = `UPDATE Questions SET Estado = 1 WHERE _rowid_ = ${row.id};`;
					db.all(sql2, []);
				} else {
					message.channel.send(
						// eslint-disable-next-line quotes
						`No hay mas preguntas para responder ameo'`
					);
					// eslint-disable-next-line quotes
					console.log(`No hay mas preguntas para responder ameo'`);
				}
			});
		} else if (args[1] == 'push') {
			// eslint-disable-next-line quotes
			// eslint-disable-next-line prettier/prettier
			const sql3 = `INSERT INTO Questions (User,QA) VALUES  ('${message.author.username}','${message.content.split('push ')[1]}')`;

			db.get(sql3, [], (err, row) => {
				if (err) {
					throw err;
				} else {
					console.log('Se ingreso una nueva pregunta!');
					return message.channel.send('✅ Tu pregunta ya se envio!');
				}
			});
		} else if (args[1] == 'history') {
			const sql2 = `SELECT DISTINCT QA Question  , User User  , _rowid_ id
            FROM Questions
            WHERE Estado = 1
			ORDER BY _rowid_ `;

			db.all(sql2, [], (err, rows) => {
				if (err) {
					throw err;
				}
				let txt = '';
				rows.forEach(row => {
					// eslint-disable-next-line prettier/prettier
					txt += `${row.User} pregunto: ${row.Question} \n`;

					console.log(
						`${row.User} pregunto (en un pasado muy muy lejano): ${row.Question} `
					);
				});
				message.channel.send(txt);
			});
			return;
		} else {
			return message.channel
				.send(`Para usar el modulo de QA usa el siguiente comando:
      \n !question push "tu pregunta aca" (no hace faltan las comillas , si respetar los espacios)`);
		}
	},
};
