-- insert into candidates (number, name) values
-- (18, 'Maclesia Santos')
-- ;
create table VOTES (
      id int auto_increment primary key,
      candidate_number int not null,
      voter_matricula varchar(50) not null,
      vote_time timestamp default current_timestamp
);
-- DROP TABLE IF EXISTS VOTES;



-- DROP TABLE IF EXISTS candidates;

-- CREATE TABLE candidates (
--     id int auto_increment primary key,
--       number int not null,
--     name varchar(100) not null
-- );


-- insert into candidates (number, name) values
-- (00, 'Nulo')
-- ;