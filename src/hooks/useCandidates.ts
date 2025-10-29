   import { useContext } from 'react';
import { CandidatesContext } from '../contexts/CandidatesContext';

export const useCandidates = () => {
	const context = useContext(CandidatesContext);
	if (context === undefined) {
		throw new Error(
			'useCandidates must be used within a CandidatesProvider'
		);
	}
	return context;
};
