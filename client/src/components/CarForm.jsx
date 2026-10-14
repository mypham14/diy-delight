import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useOptions } from '../hooks/useOptions'
import CarPreview from './CarPreview'
import OptionPicker from './OptionPicker'
import { FEATURES, calculateTotal, formatPrice } from '../utilities/calcprice'
import { findConflicts, isOptionDisabled, validateCar } from '../utilities/validation'
import { FEATURE_ORDER, carIcon } from '../utilities/display'
import '../css/Cars.css'

// Shared by the create and edit pages. `onSubmit` receives the car and may
// throw an Error (e.g. the server rejected the combination).
const CarForm = ({ initialCar, submitLabel, onSubmit }) => {
    const { data, error: loadError } = useOptions()
    const [car, setCar] = useState(initialCar ?? { name: '' })
    const [errors, setErrors] = useState([])
    const [preventConflicts, setPreventConflicts] = useState(true)
    const [nope, setNope] = useState(null)
    const [saving, setSaving] = useState(false)

    // Once options load, default every feature the car doesn't have yet to
    // the first option listed for it.
    useEffect(() => {
        if (!data) return
        setCar((prev) => {
            const next = { ...prev }
            FEATURES.forEach((feature) => {
                if (!next[feature]) {
                    next[feature] = data.options.find((o) => o.feature === feature).name
                }
            })
            return next
        })
    }, [data])

    if (loadError) return <p role='alert'>Could not load options: {loadError}</p>
    if (!data || !FEATURES.every((f) => car[f])) return <p aria-busy='true'>Loading...</p>

    const { basePrice, options, incompatible } = data
    const conflicts = findConflicts(incompatible, car)
    const total = calculateTotal(basePrice, options, car)

    const choose = (feature, name) => {
        if (preventConflicts && isOptionDisabled(incompatible, car, feature, name)) {
            const rule = findConflicts(incompatible, { ...car, [feature]: name })[0]
            setNope(rule.message)
            return
        }
        setErrors([])
        setCar((prev) => ({ ...prev, [feature]: name }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const problems = validateCar(incompatible, car)
        if (problems.length) {
            setErrors(problems)
            return
        }

        setSaving(true)
        try {
            await onSubmit(car)
        } catch (err) {
            setErrors([err.message])
            setSaving(false)
        }
    }

    return (
        <form className='create-car' onSubmit={handleSubmit}>
            <label className='prevent-toggle'>
                <input type='checkbox' checked={preventConflicts}
                    onChange={(e) => setPreventConflicts(e.target.checked)} />
                Prevent incompatible options
            </label>

            <article className='car-preview-card'>
                <CarPreview car={car} options={options} />
            </article>

            <div className='create-car-options car-options'>
                {FEATURE_ORDER.map((feature) => (
                    <OptionPicker key={feature} feature={feature} selected={car[feature]}
                        options={options.filter((o) => o.feature === feature)} onSelect={choose} />
                ))}
            </div>

            <p className='car-selection-summary'>
                {carIcon(car)} {car.exterior} · {car.roof} roof · {car.wheels} wheels · {car.interior} interior
            </p>

            <div className='create-car-price'>💰 {formatPrice(total)}</div>

            {conflicts.length > 0 && (
                <p className='form-warning'>⚠️ {conflicts.map((c) => c.message).join(' ')}</p>
            )}
            {errors.length > 0 && (
                <div className='form-error' role='alert'>
                    {errors.map((message) => <p key={message}>{message}</p>)}
                </div>
            )}

            <div className='create-car-name'>
                <input type='text' id='name' name='name' value={car.name} placeholder='My New Car'
                    aria-label='Car name'
                    onChange={(e) => setCar((prev) => ({ ...prev, name: e.target.value }))} />
                <input type='submit' className='create-car-button' value={saving ? 'Saving...' : submitLabel}
                    disabled={saving} />
            </div>

            <Modal isOpen={nope !== null} onRequestClose={() => setNope(null)} contentLabel='Invalid Selection'
                className='invalid-modal' overlayClassName='modal-overlay nope-overlay'
                appElement={document.getElementById('root')}>
                <h2>⚠️ NOPE!</h2>
                <p>{nope}</p>
                <p>Please choose another option <em>or</em><br />
                    uncheck <strong>Prevent incompatible options</strong> to try it anyway.</p>
                <button type='button' onClick={() => setNope(null)}>Ugh, ok fine 🙄</button>
            </Modal>
        </form>
    )
}

export default CarForm
