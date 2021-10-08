const pool = require('../utils/pool');

module.exports = class Cars {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      'INSERT INTO cars (make, model, year) VALUES ($1,$2,$3) RETURNING *',
      [make, model, year]
    );
    return new Cars(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    return new Cars(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return new Cars(rows[0]);
  }
};
