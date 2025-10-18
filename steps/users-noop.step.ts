import { NoopConfig } from 'motia'

export const config: NoopConfig = {
  type: 'noop',
  name: 'User Data',
  description: 'Fetches users from state.',
  virtualSubscribes: ['user-data-fetched'],
  virtualEmits: [],
  flows: ['Motio_Workflow'],
}
