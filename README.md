# Bright Network Coding Challenge

This repo contains a coding challenge for Bright Network, completed using
TypeScript.

The app fetches data from two API endpoints for jobs and members, validates the
returned JSON, and then matches the jobs to the members, based on the members'
bios.

This app relies on the `natural` package for natural language processing
([docs here](https://naturalnode.github.io/natural/)). This package is used for
tokenisation and stemming in the filter functions which process the bios and job
descriptions.

The app's entry point can be found in `src/index.ts`

## Installation and running

Clone the repo, then to install the project run:

```zsh
npm install
```

Run tests with:

```zsh
npm test
```

Run the main project with:

```zsh
npm run main
```

## Challenges and decisions

- **Type safety with JSON from API**: The JSON returned from the APIs is
  initially `unknown` type. Casting the data to the appropriate type would be
  an option, but I opted for the more robust approach of using type guard
  functions (`validateJobs` and `validateMembers`) which will throw descriptive
  errors if the data does not match the expected type (eg due to API changes).

- **Inexact matches between job titles and bios**: Some of the member bios
  contain clear preferences towards certain job, but don't use the exact titles
  which appear in the jobs data (eg "a design job" vs "UX Designer"). To match
  these, I used the tools available in the natural language processing package
  `natural`, specifically a tokeniser (to split natural language strings into
  words) and a stemmer (to remove morphological suffixes so that words with the
  same stem could be matched).

- **Complex location preferences**: Some of the member bios specify a location
  to exclude from results (eg "outside of London") or include multiple locations
  from which only one is meant to be included in results (eg "currently in
  Edinburgh but looking to relocate to London"). To handle these, the
  `filterByLocation` function checks for words which would trigger exclusion of
  a location ("outside") or specific selection of one target location
  ("relocate"), then checks the location following those trigger words and
  changes selection logic accordingly. Limitations of this are discussed below.

- **Splitting location and title filtering**: Although the exercise requires
  filtering jobs by both location and title, I opted to split these into two
  independent functions. This makes the functions easier to read and test, and
  in a real-life scenario there's a good chance there would be utility in being
  able to apply each filter independently, at the minor expense that this might
  not be the most performance-efficient way of applying these filters in the
  exercise scenario specifically.

- **Zero matched titles/locations returns the jobs array unfiltered**: Where the
  member bio does not contain a relevant location or title preference, I have
  opted to return the full jobs array, rather than an empty list. This is
  because I think it provides a better user experience, and matches the presumed
  intention of someone who provides a job title but not a location (they likely
  want to see all jobs with that title, regardless of location).

## Limitations and improvements

- **Excluding/targetting terms for location search are limited**: The current
  implementation of these checks, described in the section above, is very
  tightly coupled to the exercise data (ie, it searches specifically for the
  words "outside" and "relocate"). A full implementation would need to check
  a much more complete set of trigger words or phrases which would be checked.

  - I did consider whether sentiment analysis might be useful in determining
    whether a mention of a location was intended to include or exclude that
    location, but some relevant statements (eg "outside of {location}") have
    neutral sentiment, so this is not a straightforwardly useful option

- **Typos are not supported**: If the user mistypes something in their bio, that
  could result in failure to properly match them to jobs. A full implementation
  of this app would need to account for this, either with a fuzzy search package
  or building our own using something like natural's string distance feature.

- **Multi-word locations, nicknames, and imprecise locations are not supported**:
  Multi-word locations (eg "St Andrews"), location nicknames (eg "LA" for "Los
  Angeles"), and imprecise location names (eg "the South East", which would
  ideally include London jobs) are not supported. A full implementation would
  probably need to include improved NLP to interpret these locations, as well as
  some kind of geolocation logic to match jobs based on proximity to the
  requested location rather than specific name matching.

- **Languages other than English are not supported**: Other languages would
  require separate implementations to some extent, because search terms differ,
  and the NLP logic for tokenisation and stemming also varies between languages.
  Even if only English is to be supported, location names in other languages
  may still need accounting for in some form (eg an Anglophone resident of
  Cologne might still refer to it as "Köln" in their bio, which would ideally
  still show relevant results).

- **NLP alone is a poor choice for matching candidates to job listings**: The
  complexity of natural language makes it a poor choice for a standalone method
  of matching job listings to candidates, as completely free-form text entered
  by users could take and number of unexpected shapes which produce poor results
  on their own. Ideally, more controlled inputs would form the core of job
  matching (eg having the user select from a list of pre-determined job titles
  or industries that they're interested in, and use proper geolocation selection
  for both jobs and user preferences instead of pure NLP). Natural language
  processing of user bios would then contribute _weighting_ to job matching,
  rather than being the binary include/exclude that is shown in this app.
