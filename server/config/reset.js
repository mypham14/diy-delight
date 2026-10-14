import { pool } from './database.js'
import { options } from '../data/options.js'
import { cars } from '../data/cars.js'
import { validateCar, calculateTotal } from '../utilities/validation.js'

const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS CustomItem;
        DROP TABLE IF EXISTS Options;

        CREATE TABLE Options (
            id SERIAL PRIMARY KEY,
            feature VARCHAR(50) NOT NULL,
            name VARCHAR(100) NOT NULL,
            price INTEGER NOT NULL,
            color VARCHAR(20) NOT NULL
        );

        CREATE TABLE CustomItem (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior VARCHAR(100) NOT NULL,
            wheels VARCHAR(100) NOT NULL,
            roof VARCHAR(100) NOT NULL,
            interior VARCHAR(100) NOT NULL,
            total_price INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `

    await pool.query(createTableQuery)
    console.log('🎉 Options and CustomItem tables created successfully')
}

const seedOptions = async () => {
    for (const option of options) {
        await pool.query(
            'INSERT INTO Options (feature, name, price, color) VALUES ($1, $2, $3, $4)',
            [option.feature, option.name, option.price, option.color]
        )
    }
    console.log(`✅ ${options.length} options added successfully`)
}

const seedCars = async () => {
    for (const car of cars) {
        const errors = validateCar(car)
        if (errors.length) throw new Error(`Sample car "${car.name}" is invalid: ${errors.join(' ')}`)

        await pool.query(
            `INSERT INTO CustomItem (name, exterior, wheels, roof, interior, total_price)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [car.name, car.exterior, car.wheels, car.roof, car.interior, calculateTotal(car)]
        )
    }
    console.log(`✅ ${cars.length} sample cars added successfully`)
}

try {
    await createTables()
    await seedOptions()
    await seedCars()
} catch (err) {
    console.error('⚠️ error resetting database', err)
} finally {
    await pool.end()
}
