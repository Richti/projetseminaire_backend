import test from 'ava';
const request = require('supertest');
const app = require('../app');
const DB = require('../models/Database');

// The awaited results
const getUsers = require('./results/users/get-users.json');
const getUserOne = require('./results/users/get-users-1.json');
const postUser = require('./results/users/post-users.json');
const deleteUser = require('./results/users/delete-users-1.json');
const putUser = require('./results/users/put-users-1.json');
const sql = DB.sql('../dumps/data-tests.sql');

test.serial('Users - GET - Get all users', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/users')
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getUsers.result);
        })
    })
    .catch((error) => {
      t.fail();
      throw error;
    });
});

test.serial('Users - GET - Get user id ' + getUserOne.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .get('/users/' + getUserOne.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, getUserOne.result);
        })
    })
    .catch((error) => {
      t.fail();
      throw error;
    });
});

test.serial('Users - POST - Create User', t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .post('/users/')
        .send(postUser.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, postUser.result);
        })
    })
    .catch((error) => {
      t.fail();
      throw error;
    })
});

test.serial('Users - DELETE - Delete User with id ' + deleteUser.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .delete('/users/' + deleteUser.parameters.id)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, deleteUser.result);
        })
    })
    .catch((error) => {
      t.fail();
      throw error;
    });
});

test.serial('Users - PUT - Update User with id ' + putUser.parameters.id, t => {
  return DB.accessor.query(sql)
    .then(() => {
      return request(app)
        .put('/users/' + putUser.parameters.id)
        .send(putUser.body)
        .then((res) => {
          t.is(res.status, 200);
          t.deepEqual(res.body, putUser.result);
        })
    })
    .catch((error) => {
      t.fail();
      throw error;
    });
});