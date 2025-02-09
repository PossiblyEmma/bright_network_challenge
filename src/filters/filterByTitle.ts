import {Job, Member} from '../validators';

import natural from 'natural';

interface FilterByTitleOptions {
  member: Member;
  jobs: Job[];
}

const tokenizer = new natural.WordTokenizer();

export function filterByTitle({member, jobs}: FilterByTitleOptions) {
  const {bio} = member;
  const bioTokens = tokenizer.tokenize(bio.toLowerCase());
  const bioStems = bioTokens.map(token => natural.PorterStemmer.stem(token));

  const relevantJobs = jobs.filter(({title}) => {
    const titleTokens = tokenizer.tokenize(title.toLowerCase());
    const titleStems = titleTokens.map(token =>
      natural.PorterStemmer.stem(token),
    );
    return titleStems.some(stem => bioStems.includes(stem));
  });

  return relevantJobs.length > 0 ? relevantJobs : jobs;
}
