import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
    type: 'event',
    name: 'Process Registered User',
    description: 'Motio workflow event step, demonstrates how to consume an event from a topic and persist data in state',
    flows: ['Motio_Workflow'],
    subscribes: ['user-created'],
    emits: ['notification'], //
    input: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
    }),
}

export const handler: Handlers['Process Registered User'] = async (input, { traceId, logger, state, emit }) => {
    logger.info('Step 02 – Process User Register', { input, traceId })


    //for state persistence
    const { id, password: pass, ...stateUserInfo } = input;
    await state.set('users', id.toString(), stateUserInfo)

    const userData = await state.get('users', id.toString())

    await emit({
        topic: 'notification',
        data: userData as { name: string; email: string },
    })
}
