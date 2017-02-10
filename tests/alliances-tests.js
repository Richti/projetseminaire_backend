import test from 'ava';
const request = require('supertest');
const app = require('../app');
const DB = require('../models/Database');

// The awaited results
const getAlliances = require('./results/alliances/get-alliances.json');
const getAllianceOne = require('./results/alliances/get-alliances-1.json');
const postAlliance = require('./results/alliances/post-alliances.json');
const deleteAlliance = require('./results/alliances/delete-alliances-1.json');
const putAlliance = require('./results/alliances/put-alliances-1.json');
const sql = DB.sql('../dumps/data-tests.sql');

test.serial('Alliances - GET - Get all alliances', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/alliances')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAlliances.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Alliances - GET - Get alliance id ' + getAllianceOne.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/alliances/' + getAllianceOne.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getAllianceOne.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Alliances - POST - Create Alliance', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .post('/alliances/')
        .send(postAlliance.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, postAlliance.result);
        })
    })
    .catch((error) => {
      throw error;
    })
});

test.serial('Alliances - DELETE - Delete Alliance with id ' + deleteAlliance.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .delete('/alliances/' + deleteAlliance.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, deleteAlliance.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});

test.serial('Alliances - PUT - Update Alliance with id ' + putAlliance.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .put('/alliances/' + putAlliance.parameters.id)
        .send(putAlliance.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, putAlliance.result);
        })
    })
    .catch((error) => {
      throw error;
    });
});