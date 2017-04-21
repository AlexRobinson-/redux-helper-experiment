import { schema, normalize } from 'normalizr';
import * as todoServer from './../fake-server/todos';
import { User } from './user';
import { getAccount } from './../reducers';

const delay = (timeout = 1000) => new Promise(
  (res, rej) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 2) === 1) {
        res()
      } else {
        rej(new Error('failed'))
      }

    }, timeout)
  }
)

const { Entity } = schema;

export const Todo = new Entity('todo');

export const fetchTodos = () => delay()
  .then(() => todoServer.getTodos())
  .then(response => normalize(response, [Todo]))
  .then(response => ({ response }))

export const fetchTodo = id => delay()
  .then(() => todoServer.getTodo(id))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))

export const createTodo = (userId, todo) => delay()
  .then(() => todoServer.createTodo(userId, todo))
  .then(response => ({ ...normalize(response, Todo), userId }))
  .then(response => ({ response }))
  .catch(error => ({ error }))

export const saveTodo = (id, fields) => delay()
  .then(() => todoServer.updateTodo(id, fields))
  .then(response => normalize(response, Todo))
  .then(response => ({ response }))
  .catch(error => {
    console.log('got error', error)
    return { error }
  })

export const removeTodo = (todoId, userId) => delay()
  .then(() => todoServer.removeTodo(todoId))
  .then(() => ({ userId, todoId }))
  .then(response => ({ response }))
