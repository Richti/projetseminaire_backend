DELETE FROM users;
DELETE FROM alliances;
DELETE FROM characters;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: alliances; Type: TABLE DATA; Schema: public; Owner: efrei
--

INSERT INTO alliances(id, name) VALUES (1, 'Les gentils');
INSERT INTO alliances(id, name) VALUES (2, 'Les méchants');
INSERT INTO alliances(id, name) VALUES (3, 'Les Suisses');
--
-- Name: alliances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('alliances_id_seq', 4, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: efrei
--

INSERT INTO users(id, name, email, alliance_id) VALUES(1, 'Pierrick', 'pierrick@test.com', 1);
INSERT INTO users(id, name, email, alliance_id) VALUES(2, 'Ronan', 'ronan@test.com', 1);
INSERT INTO users(id, name, email, alliance_id) VALUES(3, 'Godefroy', 'godefroy@test.com', 1);
INSERT INTO users(id, name, email, alliance_id) VALUES(4, 'Bill', 'bill@test.com', 3);
INSERT INTO users(id, name, email, alliance_id) VALUES(5, 'Notch', 'notch@test.com', 2);
INSERT INTO users(id, name, email, alliance_id) VALUES(6, 'Fish', 'fish@test.com', 2);
INSERT INTO users(id, name, email, alliance_id) VALUES(7, 'Meyer', 'meyer@test.com', 2);
INSERT INTO users(id, name, email, alliance_id) VALUES(8, 'Kojima', 'kojima@test.com', 3);

--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: efrei
--

INSERT INTO characters(id,name,user_id,class, position) VALUES(1,	'Gedeon',	1,	'thief',	point(48.792716,2.359279));
INSERT INTO characters(id,name,user_id,class, position) VALUES(2,	'Gimli',	2,	'warrior',	point(48.792689,2.360001));
INSERT INTO characters(id,name,user_id,class, position) VALUES(3,	'Pippin',	2,	'thief',	point(48.794004,2.354250));
INSERT INTO characters(id,name,user_id,class, position) VALUES(4,	'Merry',	3,	'thief',	point(48.789443,2.363579));
INSERT INTO characters(id,name,user_id,class, position) VALUES(5,	'Aragorn',	4,	'warrior',	point(48.789216,2.364340));
INSERT INTO characters(id,name,user_id,class, position) VALUES(6,	'Boromir',	4,	'warrior',	point(48.788640,2.363770));
INSERT INTO characters(id,name,user_id,class, position) VALUES(7,	'Saroumane',	5,	'mage',	point(48.788495,2.365620));
INSERT INTO characters(id,name,user_id,class, position) VALUES(8,	'Golum',	6,	'thief',	point(48.787238,2.367082));
INSERT INTO characters(id,name,user_id,class, position) VALUES(9,	'Legolas',	7,	'thief',	point(48.788531,2.368058));
INSERT INTO characters(id,name,user_id,class, position) VALUES(10,	'Sam',	7,	'thief',	point(48.789393,2.366720));
INSERT INTO characters(id,name,user_id,class, position) VALUES(11,	'Faramir',	8,	'warrior',	point(48.789897,2.367776));


--
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('characters_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('users_id_seq', 9, true);


--
-- PostgreSQL database dump complete
--

