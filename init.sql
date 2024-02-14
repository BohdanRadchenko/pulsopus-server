SELECT 'CREATE DATABASE pulsopus_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pulsopus_db')

create table if not exists users
(
    id serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email varchar not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    password_hash varchar not null,
    refresh_token varchar
);

alter table users owner to postgres;



INSERT INTO users (email, password_hash) VALUES
('admin@pulsopus.com', '$2b$10$Rhrr5qEkCDcPmr4TKHpJjusLMXj1Ric9q2Qrri7wRezLTfH31zZ');
