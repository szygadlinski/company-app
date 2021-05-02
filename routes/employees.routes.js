const express = require('express');
const EmployeeController = require('../controllers/employees.controller');

const router = express.Router();

router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getSingle);

router.post('/employees', EmployeeController.post);

router.put('/employees/:id', EmployeeController.put);

router.delete('/employees/:id', EmployeeController.delete);

module.exports = router;
