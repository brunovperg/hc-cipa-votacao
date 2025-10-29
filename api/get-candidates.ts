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

	try {
		const connection = await createConnection();

		const [rows] = await connection.execute(
			'SELECT id, name, number FROM candidates ORDER BY number ASC'
		);

		await connection.end();

		return res.status(200).json({ candidates: rows });
	} catch (error) {
		console.error('Database error fetching candidates:', error);
		return res.status(500).json({
			error: 'Database error',
			details:
				error instanceof Error ? error.message : 'Unknown error',
		});
	}
}
