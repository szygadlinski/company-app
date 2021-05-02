const express = require('express');
const DepartmentController = require('../controllers/departments.controller');

const router = express.Router();

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getSingle);

router.post('/departments', DepartmentController.post);

router.put('/departments/:id', DepartmentController.put);

router.delete('/departments/:id', DepartmentController.delete);

module.exports = router;
