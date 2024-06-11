const { body } = require('express-validator');

const createValidationSchema = {
  // id: {
  //   notEmpty: {
  //     errorMessage: 'id cannot be empty'
  //   }
  // },
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name must be a string'
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    }
  },
  occupation: {
    in: ['body'],
    isString: {
      errorMessage: 'occupation must be a string'
    },
    notEmpty: {
      errorMessage: 'occupation cannot be empty'
    }
  }
};

module.exports = {
  createValidationSchema
};