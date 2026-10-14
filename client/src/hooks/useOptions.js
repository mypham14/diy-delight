import { useEffect, useState } from 'react'
import { getOptions } from '../services/OptionsAPI'

// Loads { basePrice, options, incompatible } from the API once.
export const useOptions = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOptions()
            .then(setData)
            .catch((err) => setError(err.message))
    }, [])

    return { data, error }
}
