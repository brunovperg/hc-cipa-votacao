import { useState, useEffect } from 'react';
import { type CandidateType } from '../types/candidate';
import { CandidatesContext } from '../contexts/CandidatesContext';

export const CandidatesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [candidates, setCandidates] = useState<CandidateType[]>([]);

	useEffect(() => {
		const fetchCandidates = async () => {
			try {
				const response = await fetch('/api/get-candidates');

				if (!response.ok) {
					throw new Error(
						`HTTP error! status: ${response.status}`
					);
				}

				const data = await response.json();
				setCandidates(data.candidates);
			} catch (error) {
				console.error('Error fetching candidates:', error);
				// Fallback to empty array or show error
				setCandidates([]);
			}
		};

		fetchCandidates();
	}, []);

	return (
		<CandidatesContext.Provider value={{ candidates, setCandidates }}>
			{children}
		</CandidatesContext.Provider>
	);
};
