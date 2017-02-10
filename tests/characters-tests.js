import test from 'ava';
const request = require('supertest');
const app = require('../app');
const DB = require('../models/Database');

// The awaited results
const getCharacters = require('./results/characters/get-characters.json');
const getCharacterOne = require('./results/characters/get-characters-1.json');
const postCharacter = require('./results/characters/post-characters.json');
const deleteCharacter = require('./results/characters/delete-characters-1.json');
const putCharacter = require('./results/characters/put-characters-1.json');
const sql = DB.sql('../dumps/data-tests.sql');

test.serial('Characters - GET - Get all characters', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/characters')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getCharacters.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Characters - GET - Get character id ' + getCharacterOne.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/characters/' + getCharacterOne.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getCharacterOne.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Characters - POST - Create Character', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .post('/characters/')
        .send(postCharacter.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, postCharacter.result);
        })
    })
    .catch((error) => {
      throw error;
    })
});

test.serial('Characters - DELETE - Delete Character with id ' + deleteCharacter.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .delete('/characters/' + deleteCharacter.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, deleteCharacter.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Characters - PUT - Update Character with id ' + putCharacter.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .put('/characters/' + putCharacter.parameters.id)
        .send(putCharacter.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, putCharacter.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});