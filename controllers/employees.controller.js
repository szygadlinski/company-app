const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(emp);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(emp);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Employee.updateOne({ _id: req.params.id }, { $set: {
        firstName: firstName,
        lastName: lastName,
        department: department,
      }});
      res.json({ message: 'OK' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) {
      res.status(404).json({ message: 'Not found' });
    } else {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
