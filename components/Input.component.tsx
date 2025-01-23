import { BaseResponseAreaProps } from '@lambda-feedback-segp-sandbox/response-area'
import React, { useCallback, useEffect, useState } from 'react'

type InputProps = Omit<BaseResponseAreaProps, 'handleChange' | 'answer'> & {
  handleChange: (val: number[] | null) => void
  answer?: number[] | null
}

// Stateless VariadicNumberArray Response Area
export const Input: React.FC<InputProps> = ({
  handleChange,
  handleSubmit,
  answer,
}) => {
  const [inputs, setInputs] = useState<(string | undefined)[]>([''])

  useEffect(() => {
    if (answer && Array.isArray(answer)) {
      const parsedInputs = [...answer.map(num => num.toString()), '']
      if (
        inputs.length !== parsedInputs.length ||
        inputs.some((val, i) => val !== parsedInputs[i])
      ) {
        setInputs(parsedInputs)
      }
    }
  }, [answer, inputs])

  const handleInputChange = (value: string, index: number) => {
    setInputs(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs[index] = value

      // Only add a new empty input if we are modifying the last input and it's not empty
      if (
        index === prevInputs.length - 1 &&
        value.trim() !== '' &&
        !newInputs.includes('')
      ) {
        newInputs.push('')
      }

      // Parse the numbers
      const parsedNumbers = newInputs
        .filter(
          (input): input is string =>
            input !== undefined && input.trim() !== '',
        )
        .map(input => parseFloat(input))

      // Handle changes
      if (parsedNumbers.some(isNaN)) {
        handleChange(null)
      } else {
        handleChange(parsedNumbers)
      }

      // Check if state update is necessary
      if (
        prevInputs.length === newInputs.length &&
        prevInputs.every((val, i) => val === newInputs[i])
      ) {
        return prevInputs
      }

      return newInputs
    })
  }

  const submitOnEnter: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (event.key !== 'Enter' || !handleSubmit) return
      event.preventDefault()
      return handleSubmit()
    },
    [handleSubmit],
  )

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(120px, 1fr))',
        gap: '8px',
        maxWidth: '100%',
        justifyContent: 'end',
      }}
      onKeyDown={submitOnEnter}>
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          value={input || ''}
          onChange={({ target: { value } }) => handleInputChange(value, index)}
          placeholder={`Number ${index + 1}`}
        />
      ))}
    </div>
  )
}
