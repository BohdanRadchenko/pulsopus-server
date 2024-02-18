SELECT 'CREATE DATABASE pulsopus_db'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname = 'pulsopus_db');

create table if not exists roles
(
    id         serial
        constraint "PK_c1433d71a4838793a49dcad46ab"
            primary key,
    created_at timestamp default ('now'::text)::timestamp(6) with time zone not null,
    updated_at timestamp default ('now'::text)::timestamp(6) with time zone not null,
    name       varchar                                                      not null
        constraint "UQ_648e3f5447f725579d7d4ffdfb7"
            unique
);

alter table roles
    owner to postgres;

INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('USER');

create table if not exists users
(
    id            serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    created_at    timestamp default ('now'::text)::timestamp(6) with time zone not null,
    updated_at    timestamp default ('now'::text)::timestamp(6) with time zone not null,
    username      varchar                                                      not null
        constraint "UQ_fe0bb3f6520ee0469504521e710"
            unique,
    first_name    varchar,
    last_name     varchar,
    password_hash varchar                                                      not null,
    refresh_token varchar,
    avatar        varchar,
    "roleId"      integer
        constraint "REL_368e146b785b574f42ae9e53d5"
            unique
        constraint "FK_368e146b785b574f42ae9e53d5e"
            references roles
);

alter table users
    owner to postgres;

-- INSERT INTO users (username, password_hash, avatar, first_name, last_name, "roleId")
-- VALUES ('test@pulsopus.com', '$2b$10$Rhrr5qEkCDcPmr4TKHpJjusLMXj1Ric9q2Qrri7wRezLTfH31zZ',
--         'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png', 'admin', 'admin', 1);
--
