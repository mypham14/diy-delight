import React from 'react'
import { getOption } from '../utilities/calcprice'
import '../css/Cars.css'

// Draws the car and updates its colors, wheels and roof to match the
// options the user has chosen.
const CarPreview = ({ car, options }) => {
    const colorOf = (feature) => getOption(options, feature, car[feature])?.color ?? '#888888'

    const body = colorOf('exterior')
    const rim = colorOf('wheels')
    const seat = colorOf('interior')
    const convertible = car.roof === 'Convertible'
    const roofFill = car.roof === 'Carbon Fiber' ? colorOf('roof') : body

    const offRoad = car.wheels === 'Off-Road'
    const tireRadius = offRoad ? 31 : 26
    const rimRadius = offRoad ? 15 : 17

    const renderWheel = (cx) => (
        <g key={cx}>
            <circle cx={cx} cy={148} r={tireRadius} fill='#111' stroke={offRoad ? '#444' : 'none'}
                strokeWidth={offRoad ? 4 : 0} strokeDasharray={offRoad ? '6 3' : undefined} />
            <circle cx={cx} cy={148} r={rimRadius} fill={rim} stroke='#555' strokeWidth='1' />
            {car.wheels === 'Sport' && [0, 45, 90, 135].map((deg) => (
                <line key={deg} x1={cx} y1={148 - rimRadius} x2={cx} y2={148 + rimRadius}
                    stroke='#888' strokeWidth='2' transform={`rotate(${deg} ${cx} 148)`} />
            ))}
            {car.wheels === 'Chrome' && (
                <circle cx={cx} cy={148} r={8} fill='none' stroke='#888' strokeWidth='2' />
            )}
        </g>
    )

    return (
        <svg className='car-preview' viewBox='0 0 400 200' role='img'
            aria-label={`${car.exterior} car with ${car.wheels} wheels, ${car.roof} roof and ${car.interior} interior`}>
            <ellipse cx='200' cy='180' rx='170' ry='8' fill='rgba(0,0,0,0.35)' />

            {/* cabin: roof, glass and seats */}
            {!convertible && <path d='M110 102 L145 62 L255 62 L295 102 Z' fill={roofFill} />}
            {car.roof === 'Sunroof' && <rect x='172' y='64' width='60' height='7' rx='2' fill={colorOf('roof')} />}
            <path d='M122 100 L150 71 L200 71 L200 100 Z' fill='#cfe8f3' opacity={convertible ? 0 : 0.9} />
            <path d='M208 100 L208 71 L250 71 L281 100 Z' fill='#cfe8f3' opacity={convertible ? 0 : 0.9} />
            <rect x='150' y='78' width='28' height='26' rx='5' fill={seat} />
            <rect x='208' y='78' width='28' height='26' rx='5' fill={seat} />
            {convertible && <line x1='258' y1='102' x2='240' y2='68' stroke='#cfe8f3' strokeWidth='4' />}

            {/* body */}
            <path d='M25 148 L30 122 Q35 104 70 102 L330 102 Q365 106 372 126 L375 148 Z' fill={body} />
            <rect x='340' y='116' width='22' height='8' rx='3' fill='#ffe9a8' />
            <rect x='38' y='116' width='16' height='8' rx='3' fill='#ff4d4d' />

            {renderWheel(95)}
            {renderWheel(305)}
        </svg>
    )
}

export default CarPreview
