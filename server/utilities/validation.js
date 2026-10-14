import { options, incompatible, BASE_PRICE } from '../data/options.js'

export const FEATURES = ['exterior', 'wheels', 'roof', 'interior']

const findOption = (feature, name) =>
    options.find((o) => o.feature === feature && o.name === name)

// Returns a list of error messages; an empty list means the combo is valid.
export const validateCar = (car) => {
    const errors = []

    if (!car.name || !String(car.name).trim()) {
        errors.push('Please give your car a name.')
    }

    for (const feature of FEATURES) {
        if (!findOption(feature, car[feature])) {
            errors.push(`Please choose a valid ${feature} option.`)
        }
    }
    if (errors.length) return errors

    for (const rule of incompatible) {
        if (car[rule.a.feature] === rule.a.name && car[rule.b.feature] === rule.b.name) {
            errors.push(rule.message)
        }
    }

    return errors
}

// The server always recalculates the price so the client can't send its own.
export const calculateTotal = (car) =>
    FEATURES.reduce((sum, feature) => sum + findOption(feature, car[feature]).price, BASE_PRICE)
