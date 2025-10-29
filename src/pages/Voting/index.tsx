import { useState } from 'react';
import Matricula from './Matricula';
import VotingCandidates from './VotingCandidates';

const Voting = () => {
	const [matricula, setMatricula] = useState<string>('');
	const [authorized, setAuthorized] = useState(false);

	return (
		<>
			<div className='h-vh flex items-center justify-center'>
				{authorized ? (
					<VotingCandidates
						matricula={matricula}
						setAuthorized={setAuthorized}
						setMatricula={setMatricula}
					/>
				) : (
					<Matricula
						matricula={matricula}
						setMatricula={setMatricula}
						setAuthorized={setAuthorized}
					/>
				)}
			</div>
		</>
	);
};
export default Voting;
