import {Job} from '../types';

export function validateJobs(jobs: unknown): asserts jobs is Job[] {
  const jobsAsType = jobs as Job[];

  if (typeof jobsAsType.forEach !== 'function')
    throw new Error('Jobs data is not an array');

  jobsAsType.forEach((job, index) => {
    if (typeof job.title !== 'string')
      throw new Error(
        `Job at index ${index} has title of wrong type. Expected string, found ${typeof job.title}`,
      );

    if (typeof job.location !== 'string')
      throw new Error(
        `Job at index ${index} has location of wrong type. Expected string, found ${typeof job.location}`,
      );
  });
}
