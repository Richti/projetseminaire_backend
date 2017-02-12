import test from 'ava';
const request = require('supertest');
const app = require('../app');
const DB = require('../models/Database');

// The awaited results
const getAllianceUsers = require('./advanced-routes-results/get-alliance-users.json');
const getAllianceCharacters = require('./advanced-routes-results/get-alliance-characters.json');
const getUserCharacters = require('./advanced-routes-results/get-user-characters.json');
const getCharactersWithClass = require('./advanced-routes-results/get-characters-class.json');
const getAllianceCharactersWithClass = require('./advanced-routes-results/get-alliance-characters-class.json');
const getAlliesInRadius = require('./advanced-routes-results/get-allies-in-radius.json');
const getEnemiesInRadius = require('./advanced-routes-results/get-enemies-in-radius.json');

const sql = DB.sql('../dumps/data-tests.sql');

test.serial('Advanced - GET - Get all users in alliance', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/alliances/' + getAllianceUsers.parameters.id + '/users')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAllianceUsers.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all characters in alliance', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/alliances/' + getAllianceCharacters.parameters.id + '/characters')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAllianceCharacters.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all user characters', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/users/' + getUserCharacters.parameters.id + '/characters')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getUserCharacters.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all characters with class', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/characters/all/' + getCharactersWithClass.parameters.class)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getCharactersWithClass.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all characters in alliance with class', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/alliances/' + getAllianceCharactersWithClass.parameters.id + '/characters/' + getAllianceCharactersWithClass.parameters.class)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAllianceCharactersWithClass.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all allies in radius', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/characters/' + getAlliesInRadius.parameters.id + '/allies/' + getAlliesInRadius.parameters.radius)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAlliesInRadius.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Advanced - GET - Get all enemies in radius', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/characters/' + getEnemiesInRadius.parameters.id + '/ennemies/' + getEnemiesInRadius.parameters.radius)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getEnemiesInRadius.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});