import {Job, Member} from '../validators';
import {PorterStemmer, WordTokenizer} from 'natural';

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
  const uniqueLocations = [
    ...new Set(jobs.map(job => job.location.toLowerCase())),
  ];

  const {bio} = member;
  const tokens = tokenizer.tokenize(bio.toLowerCase());
  const stems = tokens.map(token => PorterStemmer.stem(token));

  const foundLocations = stems.filter(stem => uniqueLocations.includes(stem));

  // Return unfiltered list if no relevant locations in bio
  if (foundLocations.length === 0) return jobs;

  // Bio specifies a location to exclude
  const outsideStem = PorterStemmer.stem('outside');
  if (stems.includes(outsideStem)) {
    const index = stems.indexOf(outsideStem);
    const locationToExclude = stems
      .slice(index)
      .find(stem => uniqueLocations.includes(stem));
    if (locationToExclude)
      return jobs.filter(
        job => job.location.toLowerCase() !== locationToExclude,
      );
  }

  // Bio contains a target location to prioritise over other locations mentioned
  const relocateStem = PorterStemmer.stem('relocate');
  if (stems.includes(relocateStem)) {
    const index = stems.indexOf(relocateStem);
    const targetLocation = stems
      .slice(index)
      .find(stem => uniqueLocations.includes(stem));
    if (targetLocation)
      return jobs.filter(job => job.location.toLowerCase() === targetLocation);
  }

  // Bio contains unmodified location(s) to include
  return jobs.filter(job =>
    foundLocations.includes(job.location.toLowerCase()),
  );
}
