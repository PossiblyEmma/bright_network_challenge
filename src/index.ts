export async function fetchData() {
  const members = await fetch(
    'https://bn-hiring-challenge.fly.dev/members.json',
  )
    .then(response => response.json())
    .catch(error => console.error(error));
  const jobs = await fetch('https://bn-hiring-challenge.fly.dev/jobs.json')
    .then(response => response.json())
    .catch(error => console.error(error));

  console.log('MEMBERS:');
  console.log(members);

  console.log('\n\n\n=====\n\n\n');
  console.log('JOBS:');
  console.log(jobs);
}

void fetchData();
