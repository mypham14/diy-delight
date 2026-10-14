export const FEATURE_ICONS = {
    exterior: '🖌️',
    roof: '😎',
    wheels: '🛴',
    interior: '💺'
}

export const FEATURE_LABELS = {
    exterior: 'Exterior',
    roof: 'Roof',
    wheels: 'Wheels',
    interior: 'Interior'
}

// Order the feature buttons are shown in.
export const FEATURE_ORDER = ['exterior', 'roof', 'wheels', 'interior']

// Background for an option card/tile, built from the option's color.
// The convertible roof has a transparent color, so it gets a striped "open top" look.
export const optionBackground = (option) => {
    if (!option || option.color.length === 9) {
        return 'repeating-linear-gradient(45deg, #111, #111 10px, #222 10px, #222 20px)'
    }
    return `linear-gradient(135deg, ${option.color}, #000 170%)`
}

export const carIcon = (car) => (car.roof === 'Convertible' ? '🚙' : '🏎️')
