const API_URL = '/api/cars'

// Parses the response and throws an Error carrying the server's message
// (e.g. an impossible feature combination) when the request fails.
const handleResponse = async (response) => {
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
    }
    return data
}

const jsonRequest = (method, car) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
})

export const getAllCars = async () => {
    const response = await fetch(API_URL)
    return handleResponse(response)
}

export const getCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse(response)
}

export const createCar = async (car) => {
    const response = await fetch(API_URL, jsonRequest('POST', car))
    return handleResponse(response)
}

export const updateCar = async (id, car) => {
    const response = await fetch(`${API_URL}/${id}`, jsonRequest('PATCH', car))
    return handleResponse(response)
}

export const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    return handleResponse(response)
}
