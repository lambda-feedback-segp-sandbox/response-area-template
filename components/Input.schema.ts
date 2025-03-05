import {
    DEFAULT_COLS,
    DEFAULT_ROWS,
  } from "@lambda-feedback-segp-sandbox/response-area-base"
  import { z } from 'zod'
  
  export const Config = z
    .object({
      // legacy config schema. transformed to the new one
      shape: z.array(z.number()).length(2),
    })
    .transform(data => {
      return {
        rows: data.shape[0] ?? DEFAULT_ROWS,
        cols: data.shape[1] ?? DEFAULT_COLS,
      }
    })
    .or(
      z.object({
        rows: z.number(),
        cols: z.number(),
      }),
    )
  
  export type Config = z.infer<typeof Config>
  
  export const Response = z.preprocess(
    val => {
      if (Array.isArray(val)) {
        return val.map(innerVal => {
          if (Array.isArray(innerVal)) {
            return innerVal.map(datum => {
              // this is being done for backwards compatibility
              if (typeof datum === 'number') return String(datum)
              // this is to prevent type incompatibility with jsonb
              if (datum === undefined) return ''
              return datum
            })
          }
          return innerVal
        })
      }
      return val
    },
    z.array(z.array(z.string())),
  )

  export type Response = z.infer<typeof Response>
