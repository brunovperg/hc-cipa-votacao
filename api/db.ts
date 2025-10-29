import mysql from 'mysql2/promise';

export async function createConnection() {
	const connection = await mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		port: parseInt(process.env.DATABASE_PORT || '3306'),
	});

	return connection;
}

export interface Vote {
	id?: number;
	voterId: number;
	candidateNumber: number;
	timestamp?: Date;
}
