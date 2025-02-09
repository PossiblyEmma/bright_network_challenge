import {Job, Member, validateJobs, validateMembers} from './validators';

async function fetchData(): Promise<{members: Member[]; jobs: Job[]}> {
  const members = await fetch(
    'https://bn-hiring-challenge.fly.dev/members.json',
  )
    .then(response => response.json())
    .catch(error => console.error(error));
  validateMembers(members);

  const jobs = await fetch('https://bn-hiring-challenge.fly.dev/jobs.json')
    .then(response => response.json())
    .catch(error => console.error(error));
  validateJobs(jobs);

  return {members, jobs};
}

const {members, jobs} = await fetchData();

console.log('MEMBERS:');
console.log(members);

console.log('\n=====\n');
console.log('JOBS:');
console.log(jobs);
