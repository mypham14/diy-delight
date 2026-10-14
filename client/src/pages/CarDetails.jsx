import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { useOptions } from '../hooks/useOptions'
import { deleteCar, getCar } from '../services/CarsAPI'
import { formatPrice, getOption } from '../utilities/calcprice'
import { FEATURE_ICONS, FEATURE_LABELS, FEATURE_ORDER, carIcon, optionBackground } from '../utilities/display'
import '../App.css'
import '../css/Cars.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data } = useOptions()
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

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${car.name}"?`)) return
        try {
            await deleteCar(car.id)
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) return <p role='alert' className='page'>{error}</p>
    if (!car || !data) return <p aria-busy='true' className='page'>Loading...</p>

    return (
        <article className='car-full-details'>
            <header>
                <h2>{carIcon(car)} {car.name}</h2>
            </header>

            <div className='details-top'>
                <div className='car-details-price'>
                    <p>💰 {formatPrice(car.total_price)}</p>
                </div>

                <div className='car-details-preview'>
                    <CarPreview car={car} options={data.options} />
                </div>

                <div className='car-modify'>
                    <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                    <button type='button' onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <div className='details-content'>
                {FEATURE_ORDER.map((feature) => {
                    const option = getOption(data.options, feature, car[feature])
                    return (
                        <div key={feature} className='car-selection' style={{ background: optionBackground(option) }}>
                            <span className='car-selection-icon'>{FEATURE_ICONS[feature]}</span>
                            <div className='car-selection-overlay'>
                                <div className='car-selection-details'>
                                    <p><strong>{FEATURE_ICONS[feature]} {FEATURE_LABELS[feature]}:</strong> {car[feature]}</p>
                                    <p className='option-price'>💵 {option?.price ? `+${formatPrice(option.price)}` : 'Included'}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </article>
    )
}

export default CarDetails
