import { Alert, Collapse, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCandidates } from '../../../hooks/useCandidates';

const VotingCandidates = ({
	matricula,
	setAuthorized,
	setMatricula,
}: {
	matricula: string;
	setAuthorized: (value: boolean) => void;
	setMatricula: (value: string) => void;
}) => {
	const [vote, setVote] = useState('');
	const [voteImage, setVoteImage] = useState('user.png');
	const [invalidVote, setInvalidVote] = useState(false);
	const [repeatedVote, setRepeatedVote] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const context = useCandidates();
	const { candidates } = context;

	const validCandidate = candidates.some(
		(v) => v.number === parseInt(typeof vote === 'string' ? vote : '')
	);

	// We'll check this in handleSubmit via API instead

	useEffect(() => {
		// Preload all candidate images
		candidates.forEach((candidate) => {
			const img = new Image();
			img.src = `/candidates/${candidate.number}.jpg`;
		});
	}, [candidates]);

	useEffect(() => {
		// Update displayed image when vote changes
		if (
			candidates.some(
				(v) =>
					v.number ===
					parseInt(typeof vote === 'string' ? vote : '')
			)
		) {
			setVoteImage(`/candidates/${vote}.jpg`);
		} else {
			setVoteImage(`/candidates/user.png`);
		}
	}, [vote, candidates]);
	// load all sounds and pre-play it with no volume to not lag
	useEffect(() => {
		const audio1 = new Audio(`/sounds/numero_urna.mp3`);
		const audio2 = new Audio(`/sounds/confirma_urna.mp3`);
		audio1.volume = 0;
		audio2.volume = 0;
		audio1.play();
		audio2.play();
		setModalIsOpen(false);
	}, []);

	const playNumberSound = () => {
		const audio = new Audio(`/sounds/numero_urna.mp3`);
		audio.play();
	};
	const playConfirmSound = () => {
		const audio = new Audio(`/sounds/confirma_urna.mp3`);
		audio.play();
	};

	const showModal = () => {
		setModalIsOpen(true);
		setTimeout(() => {
			setModalIsOpen(false);
			setAuthorized(false);
		}, 3000);
	};

	const handleGoBack = () => {
		setModalIsOpen(false);
		setMatricula('');
		setInvalidVote(false);
		setRepeatedVote(false);
		setVote('');
		setAuthorized(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const voteValue = formData.get('vote');
		const candidateNumber = parseInt(
			typeof voteValue === 'string' ? voteValue : ''
		);

		if (!validCandidate) {
			setInvalidVote(true);
			return;
		}

		try {
			// Submit vote to API
			console.log('Submitting vote:', {
				voterId: (matricula),
				candidateNumber: candidateNumber,
			});
			const response = await fetch('/api/submit-vote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					voterId: parseInt(matricula),
					candidateNumber: candidateNumber,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Vote successful
				showModal();
				playConfirmSound();
				setVote('');
				setMatricula('');
				console.log('Vote submitted successfully:', data);
			} else if (response.status === 409) {
				// Voter has already voted
				setRepeatedVote(true);
				setInvalidVote(false);
			} else {
				// Other error
				console.error('Error submitting vote:', data.error);
				alert('Erro ao registrar voto. Tente novamente.');
			}
		} catch (error) {
			console.error('Network error:', error);
			alert('Erro de conexão. Tente novamente.');
		}
	};
	return (
		<>
			{/* styling for the modal 
			darker background for modal
			*/}
			{modalIsOpen && (
				<Modal
					open={modalIsOpen}
					onClose={() => setModalIsOpen(false)}
				>
					<div className='h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.7)]'>
						<div className='modal-content text-white flex flex-col items-center justify-center p-4 bg-blue-700 border-4 border-white rounded-2xl'>
							<h1>Voto registrado com sucesso!</h1>
							<p>Obrigado por participar da votação!</p>
						</div>
					</div>
				</Modal>
			)}
			<form
				autoComplete='off'
				action=''
				className='flex flex-col gap-4 items-center bg-blue-700 px-18 pt-2 pb-8 rounded-2xl'
				onSubmit={handleSubmit}
			>
				<div className='h-12 w-full overflow-visible flex items-start'>
					<Collapse
						in={invalidVote || repeatedVote}
						sx={{ width: '100%' }}
					>
						<Alert
							variant='filled'
							severity='error'
							sx={{
								width: '100%',
								height: 'fit-content',
							}}
						>
							{repeatedVote && 'Eleitor já votou!'}
							{invalidVote &&
								' Por favor, insira um número de candidato válido.'}

							<button
								type='button'
								onClick={() => handleGoBack()}
								className='ml-4 underline hover:cursor-pointer'
							>
								Voltar
							</button>
						</Alert>
					</Collapse>
				</div>

				<div className='w-60 h-60 overflow-hidden border-2 border-white flex items-center justify-center'>
					<img src={voteImage} alt='' />
				</div>
				<div>
					<h1 className='text-white text-xl font-semibold'>
						{candidates.find(
							(c) => c.number === parseInt(vote)
						)?.name || '---'}
					</h1>
				</div>
				<TextField
					focused
					id='vote-input'
					autoFocus
					label='Número do Candidato'
					variant='outlined'
					color='info'
					name='vote'
					value={vote}
					onChange={(e) => {
						setVote(e.target.value);
						playNumberSound();
						if (invalidVote) {
							setInvalidVote(false);
						}
					}}
					inputProps={{
						maxLength: 2,
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					sx={{
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'white',
							},
							'&:hover fieldset': {
								borderColor: 'white',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'white',
							},
						},
						'& .MuiInputLabel-root': {
							color: 'white',
						},
						'& .MuiInputLabel-root.Mui-focused': {
							color: 'white',
						},
						'& .MuiOutlinedInput-input': {
							color: 'white',
							textAlign: 'center',
						},
					}}
				/>
				<button className='bg-blue-500 text-white text-2xl p-2 w-48 rounded-md hover:cursor-pointer hover:bg-blue-600'>
					Votar
				</button>
			</form>
		</>
	);
};
export default VotingCandidates;
