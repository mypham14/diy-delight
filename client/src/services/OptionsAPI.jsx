// Returns { basePrice, options, incompatible } used to build the form,
// price the car and disable incompatible choices.
export const getOptions = async () => {
    const response = await fetch('/api/options')
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Could not load options')
    }
    return data
}
