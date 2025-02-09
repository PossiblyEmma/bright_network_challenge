import {mockJobs, mockMembers} from '../mocks';

import {filterByLocation} from './filterByLocation';

describe('filterByLocation', () => {
  it("should return an unfiltered list if the member's bio does not contain any relevant locations", () => {
    const devon = mockMembers[3];
    const result = filterByLocation({member: devon, jobs: mockJobs});
    expect(result).toEqual(mockJobs);
  });
  it('should return jobs in a location specified in the member bio', () => {
    const nate = mockMembers[0];
    const result = filterByLocation({member: nate, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Producer', location: 'Bern'},
      {title: 'Actor', location: 'Bern'},
    ]);
  });
  it('should return jobs outside a location specified in the member bio', () => {
    const riley = mockMembers[4];
    const result = filterByLocation({member: riley, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Actor', location: 'London'},
      {title: 'Producer', location: 'Bern'},
      {title: 'Actor', location: 'Bern'},
      {title: 'Podcaster', location: 'London'},
    ]);
  });
  it('should only include jobs from the location a member is aiming to relocate to, not their current location', () => {
    const nova = mockMembers[1];
    const result = filterByLocation({member: nova, jobs: mockJobs});
    expect(result).toEqual([
      {title: 'Actor', location: 'London'},
      {title: 'Podcaster', location: 'London'},
    ]);
  });
});
