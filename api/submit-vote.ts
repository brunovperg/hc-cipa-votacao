import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createConnection, Vote } from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Enable CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { voterId, candidateNumber }: Vote = req.body;

	if (!voterId) {
		console.log(voterId);
		return res.status(400).json({ error: 'Voter ID is required' });
	}
	if (candidateNumber === undefined) {
		console.log(candidateNumber);
		return res
			.status(400)
			.json({ error: 'Candidate number is required' });
	}

	try {
		const connection = await createConnection();

		// Check if voter has already voted
		const [existingVotes] = await connection.execute(
			'SELECT COUNT(*) as count FROM votes WHERE voter_matricula = ?',
			[voterId]
		);

		const hasVoted =
			(existingVotes as Array<{ count: number }>)[0].count > 0;

		if (hasVoted) {
			await connection.end();
			return res
				.status(409)
				.json({ error: 'Voter has already voted' });
		}

		// Insert the vote
		await connection.execute(
			'INSERT INTO votes (voter_matricula, candidate_number, vote_time) VALUES (?, ?, NOW())',
			[voterId, candidateNumber]
		);

		await connection.end();

		return res
			.status(201)
			.json({ success: true, message: 'Vote recorded successfully' });
	} catch (error) {
		console.error('Database error:', error);
		return res.status(500).json({ error: 'Database error' });
	}
}
