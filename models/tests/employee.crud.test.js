/* eslint-disable no-undef */

const expect = require('chai').expect;
const Employee = require('../employee.model');
const Department = require('../department.model');

describe('Employee', () => {

  describe('Reading data', () => {

    let testDepOne;
    let testDepTwo;

    before(async () => {

      testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();

      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: testDepTwo._id,
      });
      await testEmpTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should return all of the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return all of the data (incl. department data) with "find" and "populate" methods', async () => {
      const employees = await Employee.find().populate('department');
      for(employee of employees){
        expect(employee.department._id).to.exist;
        expect(employee.department.name).to.exist;
      }
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const empByFirstName = await Employee.findOne({ firstName: 'John' });
      const empByLastName = await Employee.findOne({ lastName: 'Doe' });
      const empByDepartment = await Employee.findOne({ department: testDepOne._id });
      expect(empByFirstName.firstName).to.equal('John');
      expect(empByLastName.lastName).to.equal('Doe');
      expect(testDepOne._id.equals(empByDepartment.department)).to.equal(true);
    });
  });

  describe('Creating data', () => {

    after(async () => {
      await Employee.deleteMany();
    });

    it('should save new document with "save" method', async () => {
      const employee = await new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Department #1',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Department #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: 'Department #2',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John'}, { $set: { department: '=Department #1=' } });
      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).not.to.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.department = '=Department #1=';
      await employee.save();
      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).not.to.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { department: 'Updated!' } });
      const updatedEmployees = await Employee.find({ department: 'Updated!' });
      expect(updatedEmployees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'Department #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: 'Department #2',
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const removedEmployees = await Employee.find();
      expect(removedEmployees.length).to.be.equal(0);
    });
  });
});
