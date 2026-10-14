import express from 'express'
import CarsController from '../controllers/cars.js'

// Create a new router instance
const router = express.Router()

// Define routes to get, create, edit, and delete items
router.get('/', CarsController.getCars)
router.get('/:id', CarsController.getCarById)
router.post('/', CarsController.createCar)
router.patch('/:id', CarsController.updateCar)
router.delete('/:id', CarsController.deleteCar)

export default router
