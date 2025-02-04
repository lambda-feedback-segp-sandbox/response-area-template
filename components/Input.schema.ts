import { z } from 'zod'

export const inputResponseAnswerSchema = z.string()

export const inputConfigSchema = z.object({"fontFamily": z.string()})