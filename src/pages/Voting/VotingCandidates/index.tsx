import { Alert, Collapse, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useCandidates } from '../../../hooks/useCandidates';
import { useAssets } from '../../../contexts/AssetContext';

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
	const [invalidVote, setInvalidVote] = useState(false);
	const [repeatedVote, setRepeatedVote] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const context = useCandidates();
	const { candidates } = context;
	const { getImageSrc, playSound } = useAssets();

	const validCandidate = candidates.some(
		(v) => v.number === parseInt(typeof vote === 'string' ? vote : '')
	);

	const handleVoteChange = (value: string) => {
		const numericValue = value.replace(/[\D\s]/g, '');
		// Handle empty string to avoid NaN
		if (numericValue === '') {
			setVote(''); // or use a default value
		} else {
			setVote(numericValue);
		}
		playNumberSound();
		if (invalidVote) {
			setInvalidVote(false);
		}
	};

	// Images and sounds are now handled by the shared asset preloader hook
	const playNumberSound = () => {
		playSound('numero_urna');
	};
	const playConfirmSound = () => {
		playSound('confirma_urna');
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

		const candidateNumber = () => {
			if (voteValue === '00') {
				return 0;
			}
			return parseInt(typeof voteValue === 'string' ? voteValue : '');
		};

		if (!validCandidate) {
			setInvalidVote(true);
			return;
		}

		try {
			// Submit vote to API

			const response = await fetch('/api/submit-vote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					voterId: matricula,
					candidateNumber: candidateNumber(),
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Vote successful
				showModal();
				playConfirmSound();
				setVote('');
				setMatricula('');
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
				className='flex flex-col gap-4 items-center bg-[#0b1359] border-2 border-white px-18 pt-2 pb-8 rounded-2xl'
				onSubmit={handleSubmit}
			>
				<div className='h-12 w-full overflow-visible flex justify-center flex-col'>
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
							{!invalidVote && (
								<button
									type='button'
									onClick={() => handleGoBack()}
									className='ml-4 underline hover:cursor-pointer'
								>
									Voltar
								</button>
							)}
						</Alert>
					</Collapse>
					{!invalidVote && !repeatedVote && (
						<button
							type='button'
							onClick={() => handleGoBack()}
							className=' underline 4hover:cursor-pointer'
						>
							&lt; Voltar
						</button>
					)}
				</div>

				<div className='w-60 h-80 overflow-hidden border-2 border-white flex items-center justify-center'>
					<img
						src={getImageSrc(parseInt(vote) || 'user')}
						alt=''
					/>
				</div>
				<div>
					<h1 className='text-white text-3xl font-semibold'>
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
						handleVoteChange(e.target.value);
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
						'& .MuiInputBase-input': {
							fontSize: '1.5rem', // or '24px'
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
				<button className='bg-blue-500 text-white text-2xl p-2 w-48 rounded-md hover:cursor-pointer hover:bg-blue-900'>
					Votar
				</button>
			</form>
		</>
	);
};
export default VotingCandidates;
