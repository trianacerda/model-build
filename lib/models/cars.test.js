const fs = require('fs');
const pool = require('../utils/pool');
const Cars = require('./cars');

const silverFox = {
  make: 'Toyota',
  model: 'Prius',
  year: 2007,
};

const Frank = {
  make: 'Ford',
  model: 'F-150',
  year: 2006,
};

const Larry = {
  make: 'Dodge',
  model: 'Ram 2500',
  year: 2019,
};

describe('Cars model', () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + '/../../sql/setup.sql', 'utf-8')
    );
  });

  afterAll(() => {
    return pool.end();
  });
});