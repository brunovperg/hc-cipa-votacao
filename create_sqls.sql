CREATE TABLE `candidates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `candidate_number` int NOT NULL,
  `voter_matricula` varchar(50) NOT NULL,
  `vote_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=849 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comissao_enfermagem2026`.`candidates` (`id`, `number`, `name`) VALUES
(1, 1, 'Larissa Gomes Freitas de Castro'),
(2, 2, 'Amanda Santos de Andrade'),
(3, 3, 'Ana Beliza Ribeiro Brito'),
(4, 4, 'Wilma Almeida dos Santos Rodrigues'),
(5, 5, 'Sabrina Borges Barreto'),
(6, 6, 'Thauan Clint Freitas Conceição'),
(7, 7, 'José Vicente Santos Neto'),
(8, 8, 'Gabriela dos Santos Mateus'),
(9, 9, 'José Ridney Castro dos Santos'),
(10, 10, 'Antônio José Nascimento da Silva'),
(11, 11, 'Maclesia de Jesus Santos'),
(12, 12, 'Roberto Luan de Souza Menezes'),
(13, 13, 'Andreizza Silva Dias Melo'),
(14, 14, 'Cristiane de Almeida Santos'),
(15, 15, 'Eduardo Silva Santos'),
(16, 16, 'Viviany Rodrigues Silva'),
(17, 17, 'Valeria dos Santos Lima'),
(18, 18, 'Brenda Evely Alves de Souza Santos'),bvpinvestiga
(19, 20, 'NULO'),bvpinvest
(20, 00, 'BRANCO');


-- count votes for each candidate with names
SELECT c.number, c.name, COUNT(v.id) AS vote_count
FROM candidates c
LEFT JOIN votes v ON c.number = v.candidate_number
GROUP BY c.number, c.name
ORDER BY count(v.id) DESC;

-- count total votes
SELECT COUNT(*) AS total_votes FROM votes;


