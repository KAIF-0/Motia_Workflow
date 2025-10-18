import { responseMiddleware } from '../middlewares/response.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { errorMiddleware } from '../middlewares/error.middleware'
import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

const ResponseSchema = z.array(z.object({
    name: z.string(),
    email: z.string(),
}))


export const config: ApiRouteConfig = {
    type: 'api',
    name: 'Get All Users',
    flows: ['Motio_Workflow'],
    method: 'GET',
    path: '/get-users',
    middleware: [authMiddleware, responseMiddleware, errorMiddleware],
    responseSchema: {
        200: ResponseSchema,
    },
    emits: ['user-data-fetched'],
}

export const handler: Handlers['Get All Users'] = async (_req, { logger, traceId, state, emit }) => {
    logger.info('Step 04 – Get All Users API Step', { traceId })


    const allUsers: z.infer<typeof ResponseSchema> = await state.getGroup('users');
    //   console.log('All Users:', allUsers);

    // await emit({
    //     topic: 'user-data-fetched',
    //     data: { user: allUsers },
    // })

    return { status: 200, body: allUsers }
}



