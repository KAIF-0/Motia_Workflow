import { Handlers } from 'motia';
import { CronConfig } from 'motia';

export const config: CronConfig = {
    type: 'cron',
    name: 'User Cron',
    cron: '* * * * *',
    emits: [],
    flows: ['Motio_Workflow']
};


export const handler: Handlers['User Cron'] = async ({emit, logger, state}) => {
  logger.info('Initializing User Cron Job!');

  try {
    logger.info('User Cron:', {userData: await state.getGroup('users')});
  } catch (error) {
    logger.error(`Error in user cron: ${error instanceof Error ? error.message : String(error)}`);
  }
}; 