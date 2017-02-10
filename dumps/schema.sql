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

DROP DATABASE efrei;
--
-- Name: efrei; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE efrei WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect efrei

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: classes; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE classes AS ENUM (
    'warrior',
    'mage',
    'thief'
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alliances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE alliances (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


--
-- Name: alliances_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE alliances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alliances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE alliances_id_seq OWNED BY alliances.id;


--
-- Name: characters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE characters (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    user_id integer NOT NULL,
    class classes DEFAULT 'warrior'::classes NOT NULL,
    "position" point DEFAULT '(0,0)'::point NOT NULL
);


--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE characters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE characters_id_seq OWNED BY characters.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(40),
    alliance_id integer
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: alliances id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY alliances ALTER COLUMN id SET DEFAULT nextval('alliances_id_seq'::regclass);


--
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY characters ALTER COLUMN id SET DEFAULT nextval('characters_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: alliances alliances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY alliances
    ADD CONSTRAINT alliances_pkey PRIMARY KEY (id);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: characters characters_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_alliances_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_alliances_id_fk FOREIGN KEY (alliance_id) REFERENCES alliances(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: alliances; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE alliances TO efrei;


--
-- Name: characters; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE characters TO efrei;


--
-- Name: users; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE users TO efrei;


--
-- PostgreSQL database dump complete
--

-- Create user efrei

CREATE USER efrei;
ALTER USER efrei WITH PASSWORD 'efrei';
GRANT ALL PRIVILEGES ON DATABASE efrei TO efrei;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO efrei;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO efrei;