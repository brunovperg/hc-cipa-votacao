import Candidate from '../../components/Candidate';
import { useCandidates } from '../../hooks/useCandidates';
import { type CandidateType } from '../../types/candidate';

const Dashboard = () => {
	const { candidates } = useCandidates();

	return (
		<>
			<h1>CIPA - Candidatos</h1>
			<div className='flex flex-wrap gap-4 justify-center'>
				{candidates.map((candidate: CandidateType) => (
					<Candidate key={candidate.id} {...candidate} />
				))}
			</div>
		</>
	);
};
export default Dashboard;
