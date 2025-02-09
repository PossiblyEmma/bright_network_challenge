import {Job, Member} from '../types';

import {PorterStemmer} from 'natural/lib/natural/stemmers';
import {WordTokenizer} from 'natural/lib/natural/tokenizers';

interface FilterByTitleOptions {
  member: Member;
  jobs: Job[];
}

const tokenizer = new WordTokenizer();

export function filterByTitle({member, jobs}: FilterByTitleOptions) {
  const {bio} = member;
  const bioTokens = tokenizer.tokenize(bio.toLowerCase());
  const bioStems = bioTokens.map(token => PorterStemmer.stem(token));

  const relevantJobs = jobs.filter(({title}) => {
    const titleTokens = tokenizer.tokenize(title.toLowerCase());
    const titleStems = titleTokens.map(token => PorterStemmer.stem(token));
    return titleStems.some(stem => bioStems.includes(stem));
  });

  return relevantJobs.length > 0 ? relevantJobs : jobs;
}
