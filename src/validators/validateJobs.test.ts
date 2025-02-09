import {validateJobs} from './validateJobs';

describe('validateJobs', () => {
  it('should throw an error if the jobs list is not an array', () => {
    const jobs = 'jobs list';
    expect(() => validateJobs(jobs)).toThrow('Jobs data is not an array');
  });
  it("should throw an error if a job's title is not a string", () => {
    const jobs = [
      {title: 'job 1', location: 'location a'},
      {location: "this job doesn't have a title"},
    ];
    expect(() => validateJobs(jobs)).toThrow(
      'Job at index 1 has title of wrong type. Expected string, found undefined',
    );
  });
  it("should throw an error if a job's location is not a string", () => {
    const jobs = [
      {title: 'job 1', location: 1},
      {title: 'job 2', location: 'location b'},
    ];
    expect(() => validateJobs(jobs)).toThrow(
      'Job at index 0 has location of wrong type. Expected string, found number',
    );
  });
  it('should not throw any errors if the jobs list is the correct type', () => {
    const jobs = [
      {title: 'job 1', location: 'location a'},
      {title: 'job 2', location: 'location b'},
    ];
    expect(() => validateJobs(jobs)).not.toThrow();
  });
});
