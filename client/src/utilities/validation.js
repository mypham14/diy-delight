import { FEATURES } from './calcprice'

// Returns the rules that the car's current selections break.
export const findConflicts = (incompatible, car) =>
    incompatible.filter(
        (rule) => car[rule.a.feature] === rule.a.name && car[rule.b.feature] === rule.b.name
    )

// True if picking `name` for `feature` would break a rule with the
// other features' current selections. Used to disable options in the form.
export const isOptionDisabled = (incompatible, car, feature, name) =>
    findConflicts(incompatible, { ...car, [feature]: name }).length > 0

// Returns a list of error messages; an empty list means the car can be saved.
export const validateCar = (incompatible, car) => {
    const errors = []

    if (!car.name || !car.name.trim()) {
        errors.push('Please give your car a name.')
    }
    for (const feature of FEATURES) {
        if (!car[feature]) {
            errors.push(`Please choose a ${feature} option.`)
        }
    }

    return [...errors, ...findConflicts(incompatible, car).map((rule) => rule.message)]
}
