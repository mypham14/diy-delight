import React, { useState } from 'react'
import Modal from 'react-modal'
import { formatPrice } from '../utilities/calcprice'
import { FEATURE_ICONS, FEATURE_LABELS, optionBackground } from '../utilities/display'
import '../css/Cars.css'

// A button that opens a modal of option cards for one feature.
const OptionPicker = ({ feature, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const close = () => setIsOpen(false)

    return (
        <div className='option-picker'>
            <button type='button' onClick={() => setIsOpen(true)}>
                {FEATURE_ICONS[feature]} {FEATURE_LABELS[feature]}
            </button>

            <Modal isOpen={isOpen} onRequestClose={close} contentLabel={`Choose ${FEATURE_LABELS[feature]}`}
                className='option-modal' overlayClassName='modal-overlay'
                appElement={document.getElementById('root')}>
                <h2>{FEATURE_ICONS[feature]} Choose {FEATURE_LABELS[feature]}</h2>
                <div className='available-options'>
                    {options.map((option) => (
                        <div key={option.id} role='button' tabIndex={0}
                            aria-label={`${option.name}, ${option.price ? formatPrice(option.price) : 'included'}`}
                            className={`option-card${selected === option.name ? ' selected' : ''}`}
                            style={{ background: optionBackground(option) }}
                            onClick={() => onSelect(feature, option.name)}
                            onKeyDown={(e) => e.key === 'Enter' && onSelect(feature, option.name)}>
                            <span className='option-card-name'>{option.name}</span>
                            <div className='option-card-overlay'>
                                <div className='option-card-details'>
                                    <p>{option.name}<br />💵 {option.price ? `+${formatPrice(option.price)}` : 'Included'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button type='button' onClick={close}>Done</button>
            </Modal>
        </div>
    )
}

export default OptionPicker
