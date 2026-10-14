import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { useOptions } from '../hooks/useOptions'
import { deleteCar, getAllCars } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcprice'
import { carIcon } from '../utilities/display'
import '../App.css'
import '../css/Cars.css'

const ViewCars = ({ title }) => {
    const { data } = useOptions()
    const [cars, setCars] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        getAllCars()
            .then(setCars)
            .catch((err) => setError(err.message))
    }, [])

    const handleDelete = async (car) => {
        if (!window.confirm(`Delete "${car.name}"?`)) return
        try {
            await deleteCar(car.id)
            setCars((prev) => prev.filter((c) => c.id !== car.id))
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) return <p role='alert' className='page'>{error}</p>
    if (!cars || !data) return <p aria-busy='true' className='page'>Loading...</p>

    return (
        <div className='page'>
            {cars.length === 0 ? (
                <article><p>No cars yet. <Link to='/'>Customize one!</Link></p></article>
            ) : (
                cars.map((car) => (
                    <article key={car.id} className='car-card'>
                        <div className='car-summary'>
                            <h3>{carIcon(car)} {car.name}</h3>
                            <p>🖌️ <strong>Exterior:</strong> {car.exterior}</p>
                            <p>😎 <strong>Roof:</strong> {car.roof}</p>
                            <p>🛴 <strong>Wheels:</strong> {car.wheels}</p>
                            <p>💺 <strong>Interior:</strong> {car.interior}</p>
                        </div>

                        <CarPreview car={car} options={data.options} />

                        <div className='car-price'>
                            <p>💰 {formatPrice(car.total_price)}</p>
                            <Link to={`/customcars/${car.id}`} role='button'>Details</Link>
                        </div>

                        <div className='car-modify-buttons'>
                            <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                            <button type='button' onClick={() => handleDelete(car)}>Delete</button>
                        </div>
                    </article>
                ))
            )}
        </div>
    )
}

export default ViewCars
