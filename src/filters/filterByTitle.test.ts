import {mockJobs, mockMembers} from '../mocks';

import {filterByTitle} from './filterByTitle';

describe('filterByTitle', () => {
  it('should return an unfiltered list if no recognised job title is specified', () => {
    const devon = mockMembers[3];
    const result = filterByTitle({member: devon, jobs: mockJobs});
    expect(result).toEqual(mockJobs);
  });
  it('should return a list of jobs filtered by job title', () => {
    const riley = mockMembers[4];
    const result = filterByTitle({member: riley, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Podcaster', location: 'Glasgow'},
      {title: 'Podcaster', location: 'London'},
    ]);
  });
  it('should match jobs even when a different form of the title is used in the bio', () => {
    const nova = mockMembers[1];
    const result = filterByTitle({member: nova, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Podcaster', location: 'Glasgow'},
      {title: 'Podcaster', location: 'London'},
    ]);
  });
  it('should match jobs even with only a partial match of the job title', () => {
    const abi = mockMembers[2];
    const result = filterByTitle({member: abi, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Actor', location: 'London'},
      {title: 'Voice Actor', location: 'Bern'},
    ]);
  });
});
