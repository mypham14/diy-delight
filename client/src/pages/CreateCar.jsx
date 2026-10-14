import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import '../App.css'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    const handleSubmit = async (car) => {
        await createCar(car)
        navigate('/customcars')
    }

    return (
        <div className='page'>
            <h2>Customize your car</h2>
            <CarForm submitLabel='Create car' onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateCar
