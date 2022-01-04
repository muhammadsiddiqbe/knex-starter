create table users(
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  username varchar(255) not null,
  avatar varchar(255) not null,
  password varchar(255) not null,
  is_deleted boolean not null default false,
  is_blocked boolean not null default false,
  created_at timestamptz default current_timestamp,
  updated_at timestamptz default current_timestamp
);