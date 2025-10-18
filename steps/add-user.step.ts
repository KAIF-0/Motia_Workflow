import { responseMiddleware } from '../middlewares/response.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { errorMiddleware } from '../middlewares/error.middleware'
import { ApiMiddleware, ApiRequest, ApiRouteConfig, Handlers } from 'motia'
import { z, ZodError } from 'zod'

const ResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
})


export const config: ApiRouteConfig = {
  type: 'api',
  name: 'Add User',
  flows: ['Motio_Workflow'],

  method: 'POST',
  path: '/add-user',
  bodySchema: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(8),
  }),
  middleware: [authMiddleware, responseMiddleware, errorMiddleware],
  responseSchema: {
    200: ResponseSchema,
  },
  emits: ['user-created'],
}


export const handler: Handlers['Add User'] = async (req, { logger, traceId, state, emit }) => {
  logger.info('Step 01 – Processing API Step', { ...req.body, traceId })

  const { name, email, password } = req.body

  const newUser = {
    id: Math.floor(Math.random() * 1000),
    name: name,
    email: email,
    password: password,
  }

  // throw new Error("Test Error!")

  await emit({
    topic: 'user-created',
    data: {
      ...newUser
    },
  })


  return { status: 200, body: newUser }
}



