import { z } from 'zod'

export const Response = z.string()

export type Response = z.infer<typeof Response>

export const Config = z.object({ fontFamily: z.string() })

export type Config = z.infer<typeof Config>
