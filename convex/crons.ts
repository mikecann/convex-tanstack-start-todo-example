import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.interval(
  'reset tasks daily',
  { hours: 24 },
  internal.tasks.resetTasks,
  {},
)

export default crons
