/* eslint-disable no-undef */

const expect = require('chai').expect;
const Employee = require('../employee.model');

describe('Employee', () => {

  it('should throw errors without required args', () => {
    const emp = new Employee({});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw errors if args are not strings', () => {
    const cases = [{}, []];
    for(let firstName of cases){
      for(let lastName of cases){
        for(let department of cases){
          const emp = new Employee({ firstName, lastName, department });
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }
      }
    }
  });

  it('should throw an error if whichever arg length is 0', () => {
    const emp = new Employee({ firstName: '', lastName: '', department: '' });
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should not throw an error if proper args', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Lorem ipsum' });
    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
