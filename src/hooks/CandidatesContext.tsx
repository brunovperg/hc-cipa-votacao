import { useState } from 'react';
import { type CandidateType } from '../types/candidate';
import { CandidatesContext } from '../contexts/CandidatesContext';

export const CandidatesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [candidates, setCandidates] = useState<CandidateType[]>([
		{
			id: 1,
			name: 'John Doe',
			number: 10,
		},
		{
			id: 2,
			name: 'Jane Smith',
			number: 20,
		},
		{
			id: 3,
			name: 'Alice Johnson',
			number: 30,
		},
		{
			id: 4,
			name: 'Bob Brown',
			number: 40,
		},
		{
			id: 5,
			name: 'Charlie Davis',
			number: 50,
		},
		{
			id: 6,
			name: 'David Wilson',
			number: 60,
		},
	]);

	return (
		<CandidatesContext.Provider value={{ candidates, setCandidates }}>
			{children}
		</CandidatesContext.Provider>
	);
};
