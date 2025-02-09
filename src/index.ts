import {Job, validateJobs, validateMembers} from './validators';
import {filterByLocation, filterByTitle} from './filters';

interface Output {
  [memberName: string]: {
    bio: string;
    matchedJobs: Job[];
  };
}

async function fetchData() {
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

const jobsByMember = members.reduce<Output>((result, member) => {
  result[member.name] = {
    bio: member.bio,
    matchedJobs: filterByTitle({
      member,
      jobs: filterByLocation({member, jobs}),
    }),
  };
  return result;
}, {});

console.log(JSON.stringify(jobsByMember, null, 2));
