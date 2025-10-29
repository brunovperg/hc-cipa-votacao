import type { CandidateType } from '../../types/candidate';

const Candidate = (candidate: CandidateType) => {
	return (
		<div className='flex flex-col items-center border p-4 rounded-lg shadow-md w-48 text-2xl'>
			<img
				className='h-24 w-24 object-cover mb-4 '
				src={`candidates/${candidate.number}.jpg`}
				alt=''
			/>
			<h1> {candidate.name}</h1>
			<h1> {candidate.number}</h1>
			<button className='text-xl border mt-4 px-4 py-2 border-blue-500 text-white rounded-lg hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
				Votar
			</button>
		</div>
	);
};
export default Candidate;
