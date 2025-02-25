import React, { useState, JSX } from 'react'

export function wrapInput<P>(Input: React.FC<P>): (props: P) => JSX.Element {
  return (props: P) => {
    const [response, setResponse] = useState<unknown | undefined>(undefined)
    return (
      <Input
        {...props}
        answer={response}
        handleChange={(newResponse: unknown) => {
          setResponse(newResponse ?? undefined)
          var responseString: string
          if (Array.isArray(newResponse)) {
            responseString = `[${newResponse.toString()}]`
          } else {
            responseString = newResponse?.toString() ?? ''
          }
          sessionStorage.setItem('student.input', JSON.stringify(responseString))
        }}
      />
    )
  }
}
