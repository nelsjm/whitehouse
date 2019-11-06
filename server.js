import express from 'express'
import bodyParser from 'body-parser'

import dataStore from "./datastore"

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.route('/salaries')
  .get(getSalaries)
  .post(postSalary)

app.route("/salaries/:id")
  .get(getSalary)
  .put(putSalary)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

function getSalaries(req, res) {
  res.json(dataStore.getSalaries())
}

function postSalary(req, res) {
  if (!validateBody(req.body)) {
    res.statusCode = 400
    res.json()

    return
  }

  const newRecord = dataStore.addSalary(req.body)
  res.statusCode = 201
  res.json(newRecord)
}

function getSalary(req, res) {
  const id = +req.params.id
  const values = dataStore.getSalaryByID(id)

  if (values.length === 1) {
    res.json(values[0])
    return
  }

  res.statusCode = 404
  res.json()
}

function putSalary(req, res) {
  const id = +req.params.id

  // valid body, has an id, and the id matches the body's id
  if (!validateBody(req.body) || !req.body.id || req.body.id != id) {
    res.statusCode = 400
    res.json()

    return
  }

  dataStore.updateSalary(req.body)

  res.statusCode = 204
  res.json()
}

function validateBody(body) {
  if (!body.name)
    return false

  if (!body.status)
    return false

  if (body.salary < 0) {
    return false
  }

  if (!body.pay_basis)
    return false

  if (!body.position_title)
    return false

  return true
}

