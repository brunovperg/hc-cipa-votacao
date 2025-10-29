import { Alert, Collapse, TextField } from '@mui/material';
import { useState } from 'react';

const Matricula = ({
	matricula,
	setMatricula,
	setAuthorized,
}: {
	matricula: string;
	setMatricula: (value: string) => void;
	setAuthorized: (value: boolean) => void;
}) => {
	const [duplicateError, setDuplicateError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeMatricula = (value: string) => {
		const numericValue = value.replace(/\D/g, '');
		// Handle empty string to avoid NaN
		if (numericValue === '') {
			setMatricula(''); // or use a default value
		} else {
			setMatricula(numericValue);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);

		const formData = new FormData(event.currentTarget);
		const matriculaForm = formData.get('matricula');

		const matriculaStr =
			typeof matriculaForm === 'string' ? matriculaForm : '';

		// Validation: check min and max length
		if (matriculaStr.length < 4) {
			alert('Matrícula deve ter pelo menos 4 dígitos');
			return;
		}

		const limitedValue = matriculaStr.slice(0, 6);
		const paddedValue = limitedValue.padStart(6, '0');
		// setMatricula(paddedValue);

		try {
			// Check if voter has already voted using API
			const response = await fetch(
				`/api/check-voter?voterId=${paddedValue}`
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('API Error:', response.status, errorData);
				alert(
					`Erro na API: ${response.status} - ${errorData.error}`
				);
				return;
			}

			const data = await response.json();

			if (data.hasVoted) {
				setDuplicateError(true);
				setAuthorized(false);
				setIsLoading(false);
			} else {
				setMatricula(paddedValue);
				setAuthorized(true);
				setIsLoading(false);
			}
		} catch (error) {
			console.error('Network error:', error);
			alert('Erro de conexão. Tente novamente.');
		}
	};
	return (
		<>
			<form
				autoComplete='off'
				action=''
				onSubmit={(e) => {
					handleSubmit(e);
				}}
				className='flex flex-col gap-4 items-center bg-blue-700 px-18 pt-2 pb-8 rounded-2xl'
			>
				<div className='h-8 w-full overflow-visible flex items-start'>
					<Collapse in={duplicateError} sx={{ width: '100%' }}>
						<Alert
							variant='filled'
							severity='error'
							sx={{
								width: '100%',
								height: 'fit-content',
							}}
						>
							Matrícula já utilizada para votar!
						</Alert>
					</Collapse>
				</div>
				{isLoading && <div>Carregando...</div>}
				<h1 className='text-2xl font-bold text-white'>
					Digite sua matrícula
				</h1>
				<TextField
					id='matricula-input'
					autoFocus
					label='Matrícula'
					variant='outlined'
					color='info'
					name='matricula'
					value={matricula === null ? '' : matricula.toString()}
					inputProps={{
						minLength: 4,
						maxLength: 6,
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					onChange={(e) => {
						handleChangeMatricula(e.target.value);
						setDuplicateError(false);
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
					Enviar
				</button>
			</form>
		</>
	);
};
export default Matricula;
