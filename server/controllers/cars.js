import { pool } from '../config/database.js'
import { validateCar, calculateTotal } from '../utilities/validation.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM CustomItem ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM CustomItem WHERE id = $1', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createCar = async (req, res) => {
    try {
        const errors = validateCar(req.body)
        if (errors.length) {
            return res.status(400).json({ error: errors.join(' ') })
        }

        const { name, exterior, wheels, roof, interior } = req.body
        const results = await pool.query(
            `INSERT INTO CustomItem (name, exterior, wheels, roof, interior, total_price)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name.trim(), exterior, wheels, roof, interior, calculateTotal(req.body)]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const errors = validateCar(req.body)
        if (errors.length) {
            return res.status(400).json({ error: errors.join(' ') })
        }

        const { name, exterior, wheels, roof, interior } = req.body
        const results = await pool.query(
            `UPDATE CustomItem
             SET name = $1, exterior = $2, wheels = $3, roof = $4, interior = $5, total_price = $6
             WHERE id = $7
             RETURNING *`,
            [name.trim(), exterior, wheels, roof, interior, calculateTotal(req.body), id]
        )
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM CustomItem WHERE id = $1 RETURNING *', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
