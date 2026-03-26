import { funcionarios, votesData } from './funcionarios';

// Extracting the names, chapa and cargo of the voters from the funcionarios data

const normalizeMatricula = (value: string | number) =>
	String(value).replace(/^0+/, '');

export const votersNames = funcionarios
	.map((funcionario) => {
		const vote = votesData.find(
			(vote) =>
				normalizeMatricula(vote.voter_matricula) ===
				normalizeMatricula(funcionario.CHAPA),
		);

		if (!vote) {
			return null;
		}

		return {
			Nome: funcionario.NOME,
			Chapa: funcionario.CHAPA,
			Cargo: funcionario.CARGO,
			Horario_voto: vote.vote_time,
		};
	})
	.filter((voter): voter is NonNullable<typeof voter> => voter !== null);

   