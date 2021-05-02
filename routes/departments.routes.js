const express = require('express');
const Department = require('../models/department.model');

const router = express.Router();

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/departments', async (req, res) => {
  try {
    const newDepartment = new Department({ name: req.body.name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Department.updateOne({ _id: req.params.id }, { $set: { name: req.body.name }});
      res.json({
        message: 'OK',
        updatedDepartment: await Department.findById(req.params.id),
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Department.deleteOne({ _id: req.params.id });
      res.json({
        message: 'OK',
        deletedDepartment: await dep,
      });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
