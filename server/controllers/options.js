import { pool } from '../config/database.js'
import { incompatible, BASE_PRICE } from '../data/options.js'

// Returns everything the client needs to build the form, price the car
// and disable incompatible choices.
const getOptions = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Options ORDER BY id ASC')
        res.status(200).json({
            basePrice: BASE_PRICE,
            options: results.rows,
            incompatible
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { getOptions }
