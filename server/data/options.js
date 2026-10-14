export const BASE_PRICE = 25000

export const options = [
    { feature: 'exterior', name: 'Red', price: 0, color: '#c1121f' },
    { feature: 'exterior', name: 'Blue', price: 0, color: '#1d4e89' },
    { feature: 'exterior', name: 'Black', price: 500, color: '#1a1a1a' },
    { feature: 'exterior', name: 'Pearl White', price: 1200, color: '#f1f1ee' },

    { feature: 'wheels', name: 'Standard', price: 0, color: '#9aa0a6' },
    { feature: 'wheels', name: 'Sport', price: 1500, color: '#2b2b2b' },
    { feature: 'wheels', name: 'Chrome', price: 2200, color: '#e6e8eb' },
    { feature: 'wheels', name: 'Off-Road', price: 1800, color: '#6b4f2a' },

    { feature: 'roof', name: 'Standard', price: 0, color: '#c0c0c0' },
    { feature: 'roof', name: 'Sunroof', price: 1300, color: '#7ec8e3' },
    { feature: 'roof', name: 'Carbon Fiber', price: 3000, color: '#333333' },
    { feature: 'roof', name: 'Convertible', price: 4000, color: '#00000000' },

    { feature: 'interior', name: 'Cloth', price: 0, color: '#8d99ae' },
    { feature: 'interior', name: 'Leather', price: 2000, color: '#7f5539' },
    { feature: 'interior', name: 'Racing', price: 2800, color: '#d00000' }
]

// Pairs of options that cannot be combined. Served to the client so the
// form can disable them, and enforced again on the server before saving.
export const incompatible = [
    {
        a: { feature: 'roof', name: 'Convertible' },
        b: { feature: 'interior', name: 'Racing' },
        message: 'A Convertible cannot have the Racing interior (the roll cage blocks the folding roof).'
    },
    {
        a: { feature: 'roof', name: 'Carbon Fiber' },
        b: { feature: 'wheels', name: 'Off-Road' },
        message: 'The Carbon Fiber roof is not rated for the Off-Road wheel package.'
    },
    {
        a: { feature: 'roof', name: 'Convertible' },
        b: { feature: 'wheels', name: 'Off-Road' },
        message: 'Off-Road wheels raise the ride height too much for the Convertible roof.'
    }
]
