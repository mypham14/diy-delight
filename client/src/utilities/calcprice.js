export const FEATURES = ['exterior', 'wheels', 'roof', 'interior']

export const getOption = (options, feature, name) =>
    options.find((o) => o.feature === feature && o.name === name)

export const getOptionPrice = (options, feature, name) =>
    getOption(options, feature, name)?.price ?? 0

// Base price plus the price of the option chosen for each feature.
export const calculateTotal = (basePrice, options, car) =>
    FEATURES.reduce((sum, feature) => sum + getOptionPrice(options, feature, car[feature]), basePrice)

export const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
