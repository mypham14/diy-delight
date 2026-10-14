import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'
import '../App.css'

const EditCar = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        getCar(id)
            .then(setCar)
            .catch((err) => setError(err.message))
    }, [id])

    const handleSubmit = async (updated) => {
        await updateCar(id, updated)
        navigate(`/customcars/${id}`)
    }

    if (error) return <p role='alert' className='page'>{error}</p>
    if (!car) return <p aria-busy='true' className='page'>Loading...</p>

    return (
        <div className='page'>
            <h2>Edit {car.name}</h2>
            <CarForm initialCar={car} submitLabel='Save changes' onSubmit={handleSubmit} />
        </div>
    )
}

export default EditCar
