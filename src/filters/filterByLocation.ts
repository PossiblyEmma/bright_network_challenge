import {Job, Member} from '../types';

import {PorterStemmer} from 'natural/lib/natural/stemmers';
import {WordTokenizer} from 'natural/lib/natural/tokenizers';

interface FilterByLocationOptions {
  member: Member;
  jobs: Job[];
}

const tokenizer = new WordTokenizer();

/**
 * Filter jobs list to include only jobs with a location that's relevant
 * to the provided member, based on their bio.
 */
export function filterByLocation({member, jobs}: FilterByLocationOptions) {
  const {bio} = member;
  const tokens = tokenizer.tokenize(bio.toLowerCase());
  const stems = tokens.map(token => PorterStemmer.stem(token));

  const relevantJobs = jobs.filter(job => {
    const {location} = job;
    const locationStem = PorterStemmer.stem(location.toLowerCase());

    // Bio specifies a location to exclude
    const outsideStem = PorterStemmer.stem('outside');
    if (stems.includes(outsideStem))
      return (
        !stems.includes(locationStem) ||
        stems.indexOf(locationStem) < stems.indexOf(outsideStem)
      );

    // Bio indicates intention to relocate
    const relocateStem = PorterStemmer.stem('relocate');
    if (stems.includes(relocateStem))
      return (
        stems.includes(locationStem) &&
        stems.indexOf(relocateStem) < stems.indexOf(locationStem)
      );

    return stems.includes(locationStem);
  });

  return relevantJobs.length > 0 ? relevantJobs : jobs;
}
