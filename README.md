# Projet pour le seminaire WEB EFREI

Paul Fryson & Richard Gruet - Février 2017

# Installation 

//Installer les dépendances
npm install

A la racine du projet

cd dumps
psql -U postgres < schema.sql
psql -U postgres efrei < test-data.sql

# Lancer le projet

nodemon start
localhost:3000

Paul Fryson & Richard Gruet