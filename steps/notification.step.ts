import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
    type: 'event',
    name: 'ManageNotification',
    flows: ['Motio_Workflow'],
    subscribes: ['notification'],
    emits: [], //
    input: z.object({
        name: z.string(),
        email: z.string(),
    }),
}

export const handler: Handlers['ProcessRegisteredUser'] = async (input, { traceId, logger, state, emit }) => {
    logger.info('Step 03 – Manage Notifications', { input, traceId })

    //notifications
    logger.log(`Sending notification to user: ${input?.email}`)
    
}
