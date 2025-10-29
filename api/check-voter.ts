import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createConnection } from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Enable CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { voterId } = req.query;

	if (!voterId) {
		return res.status(400).json({ error: 'Voter ID is required' });
	}

	try {
		console.log('Attempting to connect to database...');
		console.log('Connection params:', {
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			database: process.env.DATABASE_NAME,
			port: process.env.DATABASE_PORT,
		});

		const connection = await createConnection();
		console.log('Database connection successful');

		const [rows] = await connection.execute(
			'SELECT COUNT(*) as count FROM votes WHERE voter_matricula = ?',
			[voterId]
		);

		await connection.end();

		const hasVoted = (rows as Array<{ count: number }>)[0].count > 0;
		return res.status(200).json({ hasVoted });
	} catch (error) {
		console.error('Database error details:', error);
		return res.status(500).json({
			error: 'Database error',
			details:
				error instanceof Error ? error.message : 'Unknown error',
		});
	}
}
