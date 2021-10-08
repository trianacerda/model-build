/* eslint-disable space-before-function-paren */
const fs = require('fs');
const pool = require('../lib/utils/pool');
const Cars = require('../lib/models/Cars');

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

describe('Cars model- build week 4', () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + '/../sql/setup.sql', 'utf-8')
    );
  });

  it('creates a new car', async () => {
    const car = await Cars.insert(silverFox);

    expect(car).toEqual({ ...silverFox, id: '1' });
  });

  it('finds a car by id', async () => {
    await Cars.insert(silverFox);
    const carId = await Cars.findById('1');

    expect(carId).toEqual({ ...silverFox, id: '1' });
  });

  it('finds ALL cars', async () => {
    await Cars.insert(silverFox);
    await Cars.insert(Larry);
    await Cars.insert(Frank);
    const allCars = await Cars.find();

    expect(allCars).toEqual(
      { ...silverFox, id: '1' },
      { ...Larry, id: '2' },
      { ...Larry, id: '3' }
    );
  });

  it('updates a car with patch(id)', async () => {
    await Cars.insert(Larry);
    const allCars = await Cars.update('1', { model: 'RAM-BRO' });

    expect(allCars).toEqual({
      id: '1',
      make: 'Dodge',
      model: 'RAM-BRO',
      year: 2019,
    });
  });

  it('deletes a car by its ID', async () => {
    await Cars.insert(Frank);
    await Cars.insert(silverFox);
    await Cars.insert(Larry);
    const deleteCar = await Cars.delete('1');

    expect(deleteCar).toEqual({});
  });

  afterAll(() => {
    return pool.end();
  });
});