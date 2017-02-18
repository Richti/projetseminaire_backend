# Projet pour le seminaire WEB EFREI

Paul Fryson & Richard Gruet - Février 2017

# Installation 

Installer postgresql
//Installer les dépendances
- npm install

//Mettre en place la base de données
- cd dumps
- psql -U postgres < schema.sql
- psql -U postgres efrei < test-data.sql

# Lancer le projet

- nodemon start ou npm start

Lancer le navigateur : localhost:3000

# Phase de tests

Installer avaJS : npm install -g ava
Initialiser : ava --init
Installer supertest : npm install -s supertest

Test possible via la commande :
- ava --serial --verbose tests/

Paul Fryson & Richard Gruet
