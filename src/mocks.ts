import {Job, Member} from './types';

export const mockJobs: Job[] = [
  {title: 'Podcaster', location: 'Glasgow'},
  {title: 'Actor', location: 'London'},
  {title: 'Producer', location: 'Bern'},
  {title: 'Voice Actor', location: 'Bern'},
  {title: 'Podcaster', location: 'London'},
];

export const mockMembers: Member[] = [
  {name: 'Nate', bio: "I'm a video and audio producer living in Bern"},
  {
    name: 'Nova',
    bio: "I'm looking for podcasting jobs, currently in Glasgow but I'm in the process of relocating to London",
  },
  {name: 'Abi', bio: "I'm an actor living in London"},
  {name: 'Devon', bio: "And I'm Devon"},
  {name: 'Riley', bio: "I'm looking for podcaster jobs outside of Glasgow"},
];
