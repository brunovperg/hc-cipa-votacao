import { createContext } from 'react';
import { type CandidateType } from '../types/candidate';

export const CandidatesContext = createContext<
	| {
			candidates: CandidateType[];
			setCandidates: React.Dispatch<
				React.SetStateAction<CandidateType[]>
			>;
	  }
	| undefined
>(undefined);
