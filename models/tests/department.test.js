/* eslint-disable no-undef */

const mongoose = require('mongoose');
const expect = require('chai').expect;
const Department = require('../department.model');

after(() => {
  mongoose.models = {};
});

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});                   // create new Department, but don't set 'name' attr value
    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" arg is not a string', () => {
    const cases = [{}, []];
    for(let name of cases){
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" arg is too short or too long', () => {
    const cases = ['abcd', 'Lorem ipsum dolor sit amet'];
    for(let name of cases){
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if "name" is okay', () => {
    const cases = ['Lorem ipsum', 'Lorem ipsum lalala'];
    for(let name of cases){
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});
