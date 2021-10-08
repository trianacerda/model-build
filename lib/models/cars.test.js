/* eslint-disable space-before-function-paren */
const fs = require('fs');
const pool = require('../utils/pool');
const Car = require('./Car');

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

describe('Car model- build week 4', () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + '/../../sql/setup.sql', 'utf-8')
    );
  });

  it('creates a new car', async () => {
    const car = await Car.insert(silverFox);

    expect(car).toEqual({ ...silverFox, id: '1' });
  });

  it('finds a car by id', async () => {
    await Car.insert(silverFox);
    const carId = await Car.findById('1');

    expect(carId).toEqual({ ...silverFox, id: '1' });
  });

  it('finds ALL car', async () => {
    await Car.insert(silverFox);
    await Car.insert(Larry);
    await Car.insert(Frank);
    const allCar = await Car.find();

    expect(allCar).toEqual([
      { ...silverFox, id: '1' },
      { ...Larry, id: '2' },
      { ...Frank, id: '3' },
    ]);
  });

  it('updates a car with patch(id)', async () => {
    await Car.insert(Larry);
    const allCar = await Car.update('1', { model: 'RAM-BRO' });

    expect(allCar).toEqual({
      id: '1',
      make: 'Dodge',
      model: 'RAM-BRO',
      year: 2019,
    });
  });

  it('deletes a car by its ID', async () => {
    await Car.insert(Frank);
    await Car.insert(silverFox);
    await Car.insert(Larry);
    const deleteCar = await Car.delete('1');

    expect(deleteCar).toEqual({});
  });

  afterAll(() => {
    return pool.end();
  });
});
